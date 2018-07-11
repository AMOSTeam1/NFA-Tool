import {Component, OnInit} from '@angular/core';
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
  project_id_param: number;
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
          this.project_id_param = +params['project_id'];
          this.editMode = params['project_id'] != null;
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

  onAddStakeholder(){
    (<FormArray>this.projectForm.get('projectStakeholders')).push(
      new FormGroup({
        'stakeholder_id' : new FormControl(null),
        'stakeholder_name' : new FormControl(null, Validators.required),
        'stakeholderFactors' : new FormArray([new FormGroup({'factorNumber': new FormControl(null, Validators.required),
          'factor': new FormControl(null)}),
          new FormGroup({'factorNumber': new FormControl(null, Validators.required),
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
        'factorNumber' : new FormControl(null, Validators.required),
        'factor' : new FormControl(null)
      })
    );
  }

  onDeleteFactor(i: number, j: number){
    (<FormArray>(<FormArray>this.projectForm.get('projectStakeholders')).at(i).get('stakeholderFactors')).removeAt(j);
  }

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
