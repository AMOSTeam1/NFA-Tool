import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/project.model';
import { CurrentProjectService } from '../current-project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectType} from '../../shared/type.model';
import {Response} from '@angular/http';
import {NfaFactorModel} from "../../shared/nfaFactor.model";
import {NfacatalogService} from "../../nfacatalog/nfacatalog.service";
import { NfacatalogComponent } from '../../nfacatalog/nfacatalog.component';
import {NfaCatalogModel} from '../../shared/nfaCatalog.model';
import {Nfa} from '../../shared/nfa.model';


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
    }
    this.projectForm = new FormGroup({
      'types' : projectTypes,
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
      null,
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
    if (this.editMode) {
      newProject.id = this.currentProjectService.getProject(this.id).id;
      newProject.projectStakeholders = this.currentProjectService.getProject(this.id).projectStakeholders;
      newProject.projectNfas = this.currentProjectService.getProject(this.id).projectNfas;
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
      //this.currentProjectService.addProject(newProject);
      this.dataStorageService.storeProject(newProject)
        .subscribe(
          (response: Response) => {
            this.dataStorageService.getProjectByName('On Process',"")
              .subscribe(
                (respons: Response) => {
                  const projects: Project[] = respons.json();
                  this.currentProjectService.setProjects(projects);
                  this.onCancel();
                }
              );
            //this.currentProjectService.updateProject(this.currentProjectService.getProjects().length - 1, response.json());
            //this.onCancel();
            //this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
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

  onEditStakeholder(){
    this.router.navigate(['stakeholder'], {relativeTo: this.route});
  }

  onChooseNfa(){
    this.router.navigate(['assignnfa'], {relativeTo: this.route});
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
