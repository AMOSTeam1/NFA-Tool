import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/project.model';
import { CurrentProjectService } from '../current-project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectType} from '../../shared/type.model';
import {Stakeholder} from '../../shared/stakeholder.model';
import {Response} from '@angular/http';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfacatalogService} from '../../nfacatalog/nfacatalog.service';
import { NfacatalogComponent } from '../../nfacatalog/nfacatalog.component';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: number;
  editMode = false;
  projectForm: FormGroup;
  types: ProjectType[] = [];
  stakeholder: Stakeholder[] = [];
  nfaFactors: NfaFactorModel[];

  fieldArray: Array<any> = [];
  newAttribute: any = {};
  showDialog;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.types = this.currentProjectService.getTypes();
          this.stakeholder = this.currentProjectService.getStakeholder();
          this.initForm();
        });

    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[]=response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
   }
  private initForm() {
    let projectTypes = new FormArray([]);
    let projectStakeholders = new FormArray([]);
    let stakeholderFactors = new FormArray([]);
    let customerName = '';
    let customerContact = '';
    let msgContact = '';
    let branch = '';
    let devProcess = '';
    let projectPhase = '';
    let projectStatus = '';
    if (this.editMode) {
      const project = this.currentProjectService.getProject(this.id);

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

        if(project['stakeholderFactors']) {

        stakeholderFactors = new FormArray([]);
        for(const factor of project.stakeholderFactors) {

          stakeholderFactors.push(
            new FormGroup({
              'nfa_id' : new FormControl(factor.nfa_id, Validators.required),
              'factor' : new FormControl(factor.factor)
            })

          )
        }
      }
      if (project['projectStakeholder']){

        projectStakeholders = new FormArray([]);
        for(const stakeholder of project.projectStakeholders) {
          projectStakeholders.push(
            new FormGroup({
              'stakeholder_id' : new FormControl(stakeholder.stakeholder_id, Validators.required),
              'stakeholder_name' : new FormControl(stakeholder.stakeholder_name, Validators.required),
              'stakeholder_factors': new FormControl (stakeholder.stakeholderFactors, Validators.required)
            })
          );
        }}




      /*for(const holder of project.projectStakeholder){
        this.newAttribute.stakeholder_name = holder.stakeholder_name;
        this.newAttribute.factor = [];
        for(const fac of holder.stakeholderFactors){
          this.newAttribute.factor.push(fac.factor);
        }
        //this.newAttribute = holder;
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
      }*/


      customerName = project.customerName;
      customerContact = project.contactPersCustomer;
      msgContact = project.contactPersMsg;
      branch = project.branch;
      devProcess = project.developmentProcess;
      projectPhase = project.projectPhase;
      projectStatus = project.projectStatus;
    } else {
        projectTypes.push(
          new FormGroup({
            'id' : new FormControl('', Validators.required),
            'name' : new FormControl('')
          }));

        projectStakeholders.push (
          new FormGroup ({
            'stakeholder_id': new FormControl ('', Validators.required),
            'stakeholder_name': new FormControl (''),
            'stakeholder_factors': new FormControl ('')
          }));

    }
    this.projectForm = new FormGroup({
      'types' : projectTypes,
      'stakeholder': projectStakeholders,
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

    const newProject = new Project(
      this.id,
      this.projectForm.value['customerName'],
      this.projectForm.value['customerContact'],
      this.projectForm.value['msgContact'],
      this.projectForm.value['branch'],
      this.projectForm.value['types'],
      this.projectForm.value['stakeholder'],
      this.projectForm.value['devProcess'],
      this.projectForm.value['projectPhase'],
      this.projectForm.value['projectStatus']
    );
    for (let i = 0; i < newProject.projectTypes.length; i++) {
      this.types.forEach((x) => {
        if (x.id.toString() === newProject.projectTypes[i].id.toString()) {newProject.projectTypes[i].name = x.name; }
      });
    }

    for (let i = 0; i < newProject.projectStakeholders.length; i++) {
      for (let j = 0; j < newProject.projectStakeholders[i].stakeholderFactors.length; j++){
        this.nfaFactors.forEach((x) => {
          if (x.nfa_id.toString() === newProject.projectStakeholders[i].stakeholderFactors[j].nfa_id.toString())
          {newProject.projectStakeholders[i].stakeholderFactors[j] = x; }
        });
      }
    }
    if (this.editMode) {
      newProject.id = this.currentProjectService.getProject(this.id).id;
      newProject.projectStakeholders = this.currentProjectService.getProject(this.id).projectStakeholders;
      this.currentProjectService.updateProject(this.id, newProject);
      this.dataStorageService.updateProject(newProject)
        .subscribe(
          (response: Response) => {

            this.onCancel();
            this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
          }
        );
    } else {
      newProject.id = null;
      this.currentProjectService.addProject(newProject);
      this.dataStorageService.storeProject(newProject)
        .subscribe(
          (response: Response) => {
            this.currentProjectService.updateProject(this.currentProjectService.getProjects().length - 1, response.json());
            this.onCancel();
            this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.projectForm.get('types')).controls;
  }

  getStakeholderControls (){
    return (<FormArray>this.projectForm.get('stakeholder')).controls;
  }
  getFactorControls(i: number){
    return (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).controls;
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
  onDeleteStakeholder (index: number){
    (<FormArray>this.projectForm.get('stakeholder')).removeAt(index);
  }

  onAddStakeholder(){
    (<FormArray>this.projectForm.get('stakeholder')).push(
      new FormGroup({
        'stakeholder_id' : new FormControl(null),
        'stakeholder_name' : new FormControl(null, Validators.required),
        'stakeholderFactors' : new FormArray([new FormGroup({'nfa_id': new FormControl(null, Validators.required),
          'factor': new FormControl(null)}),
          new FormGroup({'nfa_id': new FormControl(null, Validators.required),
            'factor': new FormControl(null)})])
      })
    );
  }
  onAddFactor(i: number){
    (<FormArray>(<FormArray>this.projectForm.get('stakeholder')).at(i).get('stakeholderFactors')).push(
      new FormGroup({
        'nfa_id': new FormControl(null, Validators.required),
        'factor' : new FormControl(null)
      })
    );
  }

  onDeleteFactor(i: number, j: number){
    (<FormArray>(<FormArray>this.projectForm.get('stakeholder')).at(i).get('stakeholderFactors')).removeAt(j);
  }

  updatePhase(){
    const no_phase = new FormControl('None', Validators.required );
    const choose_phase = new FormControl('', Validators.required );
    if (this.projectForm.value['devProcess'] === 'Agile')
    { this.projectForm.setControl('projectPhase', no_phase);}
    else
    {this.projectForm.setControl('projectPhase', choose_phase);}
  }
  isAgileCheck() {
    if (this.projectForm.value['devProcess'] === 'Agile')
      { return true;}
    else
      {return false;}
  }

  isMinimum(i:number){
    return ((<FormArray>this.projectForm.get('types')).length === 1);
  }

  isStakeholderMinimum(i:number){
    return ((<FormArray>this.projectForm.get('stakeholder')).length === 1);
  }

  onEditStakeholder(){
    this.router.navigate(['stakeholder'], {relativeTo: this.route});
  }


  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};


  }


  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  /*onUpdateProject() {
      this.dataStorage.updateProject(this.project).subscribe((response) => {
      this.currentProjectService.updateProject(this.id, this.project);
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }*/
}
