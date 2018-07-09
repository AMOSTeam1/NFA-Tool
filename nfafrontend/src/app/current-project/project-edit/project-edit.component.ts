import {DataStorageService} from '../../shared/data-storage.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../shared/project.model';
import {CurrentProjectService} from '../current-project.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectType} from '../../shared/type.model';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfacatalogService} from '../../nfacatalog//nfacatalog.service'
import {ISubscription} from "rxjs/Subscription";
import {LocalStorageService} from 'angular-web-storage';
import {Stakeholder} from '../../shared/stakeholder.model';
import {DataexchangeService as DExchS} from "../../shared/dataexchange.service";


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  project_id_param: number;
  project_is_in_editmode = false;
  projectForm: FormGroup;
  types: ProjectType[] = [];
  nfaFactors: NfaFactorModel[];

  subscription : ISubscription[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              public local: LocalStorageService,
  ) {
    this.subscription = [];
  }

  ngOnInit() {
    const subscription = this.route.params.subscribe(
      (params: Params) => {
        this.project_id_param = +params['project_id'];
        this.project_is_in_editmode = params['project_id'] != null;

        this.types = this.currentProjectService.getTypes();

        if(params['project_id'] != 'new'){

          if(!this.currentProjectService.hasCurrentlyEditedProject()){

            console.debug("We use project id to fetch proj " + this.project_id_param);
            let proj : Project = this.currentProjectService.getProjectById(this.project_id_param);
            console.debug(proj.projectNfas);
            this.currentProjectService.setCurrentlyEditedProject(proj);
          }
          this.subscription.push(
            this.dataStorageService.getCustomNfaPerProject(this.project_id_param).subscribe(
              value => this.currentProjectService.setCustomNfa(value)
            )
          );
        }
      });
    this.subscription.push(subscription);

    const subscription2 = this.dataStorageService.getNfaFactors()
      .subscribe(
        response => {
          const nfaFactors: NfaFactorModel[] = response;
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        },
        error1 => console.log(error1)
      );

    this.subscription.push(subscription2);
    this.nfaCatalogService.setProjectMode(true);

    this.initForm();
   }

   ngOnDestroy(){
     for(let item of this.subscription){
       item.unsubscribe();
     }
   }

   //TODO split body into multiple smaller functions
  private initForm() {
    let projectTypes = new FormArray([]);
    let projectStakeholders = new FormArray([]);
    let customerName = '';
    let customerContact = '';
    let msgContact = '';
    let branch = '';
    let devProcess = '';
    let projectPhase = '';
    let projectStatus = '';

    if (this.project_is_in_editmode) {
      const edited_project = this.currentProjectService.getCurrentlyEditedProject();
      if (edited_project['projectTypes']){

        projectTypes = new FormArray([]);
        for(const type of edited_project.projectTypes) {
          projectTypes.push(
            new FormGroup({
              'id' : new FormControl(type.id, Validators.required),
              'name' : new FormControl(type.name, Validators.required)
            })
          );
        }}

      /*stakeholder changes begin*/
      if(edited_project['projectStakeholders']) {
        for(const stakeholder of edited_project.projectStakeholders) {

          let stakeholderFactors= new FormArray([]);
          if(stakeholder['stakeholderFactors']) {
            for(const factor of stakeholder.stakeholderFactors) {

              stakeholderFactors.push(
                new FormGroup({
                  'factorNumber' : new FormControl(factor, Validators.required)
                })
              )
            }
          }

          projectStakeholders.push(
            new FormGroup({
              'stakeholder_id' : new FormControl(stakeholder.stakeholder_id),
              'stakeholder_name' : new FormControl(stakeholder.stakeholder_name, Validators.required),
              'stakeholderFactors' : stakeholderFactors
            })
          );
        }
      }
      /*stakeholder changes ends*/


      customerName = edited_project.customerName;
      customerContact = edited_project.contactPersCustomer;
      msgContact = edited_project.contactPersMsg;
      branch = edited_project.branch;
      devProcess = edited_project.developmentProcess;
      projectPhase = edited_project.projectPhase;
      projectStatus = edited_project.projectStatus;
    }

    else if(this.local.get(DExchS.project_mode)){
      const project = this.local.get(DExchS.currProject);
      if (project['projectTypes']){
      projectTypes = new FormArray([]);
      for(const type of project.projectTypes) {
        projectTypes.push(
          new FormGroup({
            'id' : new FormControl(type.id, Validators.required),
            'name' : new FormControl(type.name, Validators.required)
          })
        );
      }}

    customerName = project.customerName;
    customerContact = project.contactPersCustomer;
    msgContact = project.contactPersMsg;
    branch = project.branch;
    devProcess = project.developmentProcess;
    projectPhase = project.projectPhase;
    projectStatus = project.projectStatus;

    }
    else {
      projectTypes.push(
        new FormGroup({
          'id' : new FormControl('', Validators.required),
          'name' : new FormControl('')
        }));

      /*stakeholder changes begins*/
      const stakeholderFactors = new FormArray([]);
      stakeholderFactors.push(
        new FormGroup({
          'factorNumber' : new FormControl('', Validators.required)
        })
      );

      projectStakeholders.push(
        new FormGroup({
          'stakeholder_id' : new FormControl(''),
          'stakeholder_name' : new FormControl('', Validators.required),
          'stakeholderFactors' : stakeholderFactors
        })
      );
      /*stakeholder changes ends*/
    }

    this.projectForm = new FormGroup({
      //Form Groups
      'types' : projectTypes,
      'projectStakeholders' : projectStakeholders,

      //Form Controls
      'customerName': new FormControl(customerName, Validators.required),
      'customerContact': new FormControl(customerContact, Validators.required),
      'msgContact': new FormControl(msgContact, Validators.required),
      'branch': new FormControl(branch, Validators.required),
      'devProcess': new FormControl(devProcess, Validators.required),
      'projectPhase': new FormControl(projectPhase, Validators.required),
      'projectStatus': new FormControl(projectStatus, Validators.required)
    });
  }

  onSubmit() {
    this.local.clear();
    const newProject = new Project(
      this.project_id_param,
      this.projectForm.value['customerName'],
      this.projectForm.value['customerContact'],
      this.projectForm.value['msgContact'],
      this.projectForm.value['branch'],
      this.projectForm.value['types'],
      /*stakeholder changes begins*/
      this.projectForm.value['projectStakeholders'],
      /*stakeholder changes ends*/
      this.projectForm.value['devProcess'],
      this.projectForm.value['projectPhase'],
      this.projectForm.value['projectStatus'],
      []
    );

    for (let i = 0; i < newProject.projectTypes.length; i++){
      this.types.forEach((x) => {
        if (x.id.toString() === newProject.projectTypes[i].id.toString()) {newProject.projectTypes[i].name = x.name; }
      });
    }

    /*stakeholder changes begins*/
    const stakeholders: Stakeholder[] = [];
    const projectStakeholders = this.projectForm.value['projectStakeholders'];

    for (let i = 0; i < projectStakeholders.length; i++) {
      const stakeholder: Stakeholder = new Stakeholder(null, null, []);

      stakeholder.stakeholder_id = projectStakeholders[i].stakeholder_id;
      stakeholder.stakeholder_name = projectStakeholders[i].stakeholder_name;

      for (let j = 0; j < projectStakeholders[i].stakeholderFactors.length; j++) {

        this.nfaFactors.forEach((x) => {

          if (x.factorNumber.toString() === projectStakeholders[i].stakeholderFactors[j].factorNumber.toString())
          {
            stakeholder.stakeholderFactors.push(x.factorNumber);
          }
        });
      }
      stakeholders.push(stakeholder);
    }

    newProject.projectStakeholders = stakeholders;
    /*stakeholder changes ends*/

    if (this.project_is_in_editmode) {
      let loadedProject : Project = this.currentProjectService.getCurrentlyEditedProject();
      newProject.id = loadedProject.id;
      newProject.projectNfas = loadedProject.projectNfas.slice();
      console.log("Saving Project with these NFAS selected");
      console.log(newProject.projectNfas);

      this.currentProjectService.updateProject(this.project_id_param, newProject);

      const subsciption = this.dataStorageService.updateProject(newProject)
        .subscribe(
          (response) => {

            this.onCancel();
            this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
            console.debug("Update has been send");
          }
        );
      this.subscription.push(subsciption);
    } else {
      //new Project needs to be created
      newProject.id = null;

      const subscription = this.dataStorageService.storeProject(newProject)
        .subscribe(
          (response) => {
           const subscription1 = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),"")
              .subscribe(
                respons => {
                  this.currentProjectService.setProjects(respons);
                  this.onCancel();
                },
                error1 => console.log(error1)
              );
            this.subscription.push(subscription1);
          }
        );
      this.subscription.push(subscription);

    }

    this.currentProjectService.clearEditedProject();
  }

  onCancel() {
    this.local.clear();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.projectForm.get('types')).controls;
  }

  onDeleteType(index: number){
    (<FormArray>this.projectForm.get('types')).removeAt(index);
  }

  onAddType(){
    (<FormArray>this.projectForm.get('types')).push(
      new FormGroup({
        'id' : new FormControl(null, Validators.required),
        'name' : new FormControl(null)
      })
    );
  }

  updatePhase(){
    const no_phase = new FormControl('None', Validators.required );
    const choose_phase = new FormControl('', Validators.required );

    if (this.projectForm.value['devProcess'] === 'Agile')
    {
      this.projectForm.setControl('projectPhase', no_phase);
    }
    else {
      this.projectForm.setControl('projectPhase', choose_phase);
    }
  }

  isAgileCheck() {
    if (this.projectForm.value['devProcess'] === 'Agile') {
      return true;
    }
    else {
      return false;
    }
  }

  isMinimum(i:number){
    return ((<FormArray>this.projectForm.get('types')).length === 1);
  }

  onChooseNfa(){
    console.debug("onChooseNfa");

    const newProject = new Project(
      this.project_id_param,
      this.projectForm.value['customerName'],
      this.projectForm.value['customerContact'],
      this.projectForm.value['msgContact'],
      this.projectForm.value['branch'],
      this.projectForm.value['types'],
      null,
      this.projectForm.value['devProcess'],
      this.projectForm.value['projectPhase'],
      this.projectForm.value['projectStatus'],
      []
    );

    if(this.currentProjectService.hasCurrentlyEditedProject()){
      this.local.set(DExchS.selNfs, this.currentProjectService.getCurrentlyEditedProject().projectNfas);
    }

    this.local.set(DExchS.currProject, newProject);
    this.local.set(DExchS.project_mode,true);

    this.router.navigate(['nfa'], {relativeTo: this.route});
  }

  /*changes to add stakeholder begins*/
  isFacMinimum(i: number, j: number){
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 1);
  }

  isFacMaximum(i: number, j: number){
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 13);
  }

  getStakeControls(){
    return (<FormArray>this.projectForm.get('projectStakeholders')).controls;
  }

  getFactorControls(i: number){
    return (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).controls;
  }

  onAddStakeholder(){
    (<FormArray>this.projectForm.get('projectStakeholders')).push(
      new FormGroup({
        'stakeholder_id' : new FormControl(null),
        'stakeholder_name' : new FormControl(null, Validators.required),
        'stakeholderFactors' : new FormArray([new FormGroup({'factorNumber': new FormControl(null, Validators.required)}),
          new FormGroup({'factorNumber': new FormControl(null, Validators.required)})])
      })
    );
  }

  onDeleteStakeholder(index: number){
    (<FormArray>this.projectForm.get('projectStakeholders')).removeAt(index);
  }

  onAddFactor(i: number){
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).push(
      new FormGroup({
        'factorNumber' : new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteFactor(i: number, j: number){
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).removeAt(j);
  }
  /*changes to add stakeholder ends*/

}
