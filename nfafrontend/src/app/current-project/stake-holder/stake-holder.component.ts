import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../shared/data-storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrentProjectService} from '../current-project.service';
import {NfaFactorModel} from '../../shared/nfaFactor.model';

import {NfacatalogService} from '../../nfacatalog/nfacatalog.service';

@Component({
  selector: 'app-stake-holder',
  templateUrl: './stake-holder.component.html',
  styleUrls: ['./stake-holder.component.css']
})
export class StakeHolderComponent implements OnInit {
  id: number;
  editMode = false;
  index: number;
  projectForm: FormGroup;
  nfaFactors: NfaFactorModel[];

  constructor(private route: ActivatedRoute,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          //this.initForm();

          this.dataStorageService.getNfaFactors()
            .subscribe(
              response => {
                const nfaFactors: NfaFactorModel[]=response;
                this.nfaCatalogService.setNfaFactors(nfaFactors);
                this.nfaFactors = nfaFactors;
              },
              error1 => console.log(error1)
            );
        }
      );
  }

  /*onSubmit() {

    const newProject = this.currentProjectService.getProject(this.id);
    newProject.projectStakeholders = this.projectForm.value['projectStakeholders'];
    for (let i = 0; i < newProject.projectStakeholders.length; i++) {
      for (let j = 0; j < newProject.projectStakeholders[i].stakeholderFactors.length; j++){
        this.nfaFactors.forEach((x) => {
          if (x.nfa_id.toString() === newProject.projectStakeholders[i].stakeholderFactors[j].nfa_id.toString())
          {newProject.projectStakeholders[i].stakeholderFactors[j] = x; }
        });
      }
    }
    this.currentProjectService.updateProject(this.id, newProject);
    this.dataStorageService.updateProject(newProject)
      .subscribe(
        (response: Response) => {

          this.onCancel();
          this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
        }
      );

    this.onCancel();
  }*/

  onAddStakeholder(){
    (<FormArray>this.projectForm.get('projectStakeholders')).push(
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

  onDeleteStakeholder(index: number){
    (<FormArray>this.projectForm.get('projectStakeholders')).removeAt(index);
  }

  onAddFactor(i: number){
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).push(
      new FormGroup({
        'nfa_id': new FormControl(null, Validators.required),
        'factor' : new FormControl(null)
      })
    );
  }

  onDeleteFactor(i: number, j: number){
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).removeAt(j);
  }

  /*private initForm() {

    let projectStakeholders = new FormArray([]);


    if (this.editMode) {
      const project = this.currentProjectService.getProject(this.id);
      if(project['projectStakeholders']) {
        for(const stakeholder of project.projectStakeholders) {

          let stakeholderFactors= new FormArray([]);
          if(stakeholder['stakeholderFactors']) {
            for(const factor of stakeholder.stakeholderFactors) {

              stakeholderFactors.push(
                new FormGroup({
                  'nfa_id' : new FormControl(factor.nfa_id, Validators.required),
                  'factor' : new FormControl(factor.factor)
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
    }

    this.projectForm = new FormGroup({
      'projectStakeholders' : projectStakeholders
    });

  }*/

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isMinimum(i:number, j: number){
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 1);
  }

  isMaximum(i:number, j: number){
    return ((<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).length === 13);
  }

  getStakeControls(){
    return (<FormArray>this.projectForm.get('projectStakeholders')).controls;
  }

  getFactorControls(i: number){
    return (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).controls;
  }

}
