import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/project.model';
import { CurrentProjectService } from '../current-project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectType} from '../../shared/type.model';
import {Response} from '@angular/http';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfacatalogService} from '../../nfacatalog//nfacatalog.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {Stakeholder} from '../../shared/stakeholder.model';


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
  nfaFactors: NfaFactorModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              public local: LocalStorageService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.types = this.currentProjectService.getTypes();
          this.initForm();
        });

    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[] = response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
    this.nfaCatalogService.setProjectMode(true);
   }

  private initForm() {
    let projectTypes = new FormArray([]);
    const projectStakeholders = new FormArray([]);
    let customerName = '';
    let customerContact = '';
    let msgContact = '';
    let branch = '';
    let devProcess = '';
    let projectPhase = '';
    let projectStatus = '';
    if (this.editMode) {
      const project = this.currentProjectService.getProject(this.id);
      if (project['projectTypes']) {

        projectTypes = new FormArray([]);
        for (const type of project.projectTypes) {
          projectTypes.push(
            new FormGroup({
              'id' : new FormControl(type.id, Validators.required),
              'name' : new FormControl(type.name, Validators.required)
            })
          );
        }}

      /*stakeholder changes begin*/
      if (project['projectStakeholders']) {
        for (const stakeholder of project.projectStakeholders) {

          const stakeholderFactors = new FormArray([]);
          if (stakeholder['stakeholderFactors']) {
            for (const factor of stakeholder.stakeholderFactors) {

              stakeholderFactors.push(
                new FormGroup({
                  'nfa_id' : new FormControl(factor, Validators.required)
                })
              );
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


      customerName = project.customerName;
      customerContact = project.contactPersCustomer;
      msgContact = project.contactPersMsg;
      branch = project.branch;
      devProcess = project.developmentProcess;
      projectPhase = project.projectPhase;
      projectStatus = project.projectStatus;
    } else if (this.local.get('nfaMode')) {
      const project = this.local.get('currProject');
      if (project['projectTypes']) {
      projectTypes = new FormArray([]);
      for (const type of project.projectTypes) {
        projectTypes.push(
          new FormGroup({
            'id' : new FormControl(type.id, Validators.required),
            'name' : new FormControl(type.name, Validators.required)
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

      /*stakeholder changes begins*/
      const stakeholderFactors = new FormArray([]);
      stakeholderFactors.push(
        new FormGroup({
          'nfa_id' : new FormControl('', Validators.required)
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
      'types' : projectTypes,
      /*stakeholder changes begins*/
      'projectStakeholders' : projectStakeholders,
      /*stakeholder changes ends*/
      'customerName': new FormControl(customerName, Validators.required),
      'customerContact': new FormControl(customerContact, Validators.required),
      'msgContact': new FormControl(msgContact, Validators.required),
      'branch': new FormControl(branch, Validators.required),
      'devProcess': new FormControl(devProcess, Validators.required),
      'projectPhase': new FormControl(projectPhase, Validators.required),
      'projectStatus': new FormControl(projectStatus, Validators.required),
      'importNfaControl': new FormControl(null)
    });
  }

  onImportNfa(event) {
    this.dataStorageService.importNfa((<FileList>event.target.files).item(0));
  }

  onSubmit() {
    this.local.clear();
    const newProject = new Project(
      this.id,
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
    for (let i = 0; i < newProject.projectTypes.length; i++) {
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
          if (x.nfa_id.toString() === projectStakeholders[i].stakeholderFactors[j].nfa_id.toString()) {stakeholder.stakeholderFactors.push(x.nfa_id); }});
      }
      stakeholders.push(stakeholder);
    }
    newProject.projectStakeholders = stakeholders;
    /*stakeholder changes ends*/
    if (this.editMode) {
      newProject.id = this.currentProjectService.getProject(this.id).id;
      newProject.projectNfas = this.currentProjectService.getProject(this.id).projectNfas;
      console.log(newProject);
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
      this.dataStorageService.storeProject(newProject)
        .subscribe(
          (response: Response) => {
            this.dataStorageService.getProjectByName('On Process', '')
              .subscribe(
                (respons: Response) => {
                  const projects: Project[] = respons.json();
                  this.currentProjectService.setProjects(projects);
                  this.onCancel();
                }
              );
          }
        );
    }
  }

  onCancel() {
    this.local.clear();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.projectForm.get('types')).controls;
  }

  onDeleteType(index: number) {
    (<FormArray>this.projectForm.get('types')).removeAt(index);
  }

  onAddType() {
    (<FormArray>this.projectForm.get('types')).push(
      new FormGroup({
        'id' : new FormControl(null, Validators.required),
        'name' : new FormControl(null)
      })
    );
  }

  updatePhase() {
    const no_phase = new FormControl('None', Validators.required );
    const choose_phase = new FormControl('', Validators.required );
    if (this.projectForm.value['devProcess'] === 'Agile') { this.projectForm.setControl('projectPhase', no_phase); } else {this.projectForm.setControl('projectPhase', choose_phase); }
  }

  isAgileCheck() {
    if (this.projectForm.value['devProcess'] === 'Agile') { return true; } else {return false; }
  }

  isMinimum(i: number) {
    return ((<FormArray>this.projectForm.get('types')).length === 1);
  }

  onChooseNfa() {

     const newProject = new Project(
      this.id,
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
     this.currentProjectService.setProject(newProject);
    this.local.set('currProject', newProject);
    this.local.set('nfaMode', true);


    this.router.navigate(['nfa'], {relativeTo: this.route});
  }

  /*changes to add stakeholder begins*/
  isFacMinimum(i: number, j: number) {
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 1);
  }

  isFacMaximum(i: number, j: number) {
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 13);
  }

  getStakeControls() {
    return (<FormArray>this.projectForm.get('projectStakeholders')).controls;
  }

  getFactorControls(i: number) {
    return (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).controls;
  }

  onAddStakeholder() {
    (<FormArray>this.projectForm.get('projectStakeholders')).push(
      new FormGroup({
        'stakeholder_id' : new FormControl(null),
        'stakeholder_name' : new FormControl(null, Validators.required),
        'stakeholderFactors' : new FormArray([new FormGroup({'nfa_id': new FormControl(null, Validators.required)}),
          new FormGroup({'nfa_id': new FormControl(null, Validators.required)})])
      })
    );
  }

  onDeleteStakeholder(index: number) {
    (<FormArray>this.projectForm.get('projectStakeholders')).removeAt(index);
  }

  onAddFactor(i: number) {
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).push(
      new FormGroup({
        'nfa_id': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteFactor(i: number, j: number) {
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).removeAt(j);
  }
  /*changes to add stakeholder ends*/

}
