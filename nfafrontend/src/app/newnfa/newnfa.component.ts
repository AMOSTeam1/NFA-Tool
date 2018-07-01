import {Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';
import {NfacatalogService} from '../nfacatalog/nfacatalog.service';
import {NfaFactorModel} from '../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../shared/nfaCriteria.model';
import {NfaMetric} from '../shared/nfaMetric.model';
import {NfatemplateComponent} from './nfatemplate/nfatemplate.component';
import {NfaCatalogBlueprintModel} from '../shared/nfaCatalogBlueprint.model';
import {BpPropertyTemplateNoConditionDe} from '../shared/blueprints/bpPropertyTemplateNoConditionDe.model';
import {BpPropertyTemplateNoConditionEn} from '../shared/blueprints/bpPropertyTemplateNoConditionEn.model';
import {NfaCatalogModel} from '../shared/nfaCatalog.model';
import {QualifiyingExpression} from '../shared/blueprints/QualifiyingExpression.model';


@Component({
  selector: 'app-newnfa',
  templateUrl: './newnfa.component.html',
  styleUrls: ['./newnfa.component.css']
})
export class NewnfaComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService) {
  }

  nfaform: FormGroup;
  nfaFactors: NfaFactorModel[];
  @ViewChild(NfatemplateComponent) nfatemplate;

  selectedFactor: NfaFactorModel = undefined;
  selectedCriteria: NfaCriteriaModel = undefined;
  selectedMetric: NfaMetric = undefined;
  selectedType: any;
  valid = false;

  validUpdate = (value: boolean) => {
    this.valid = value;
  }

  ngOnInit() {
    this.initForm();

    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[] = response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
  }

  private initForm() {

    this.nfaform = new FormGroup({
      'factor': new FormControl('', Validators.required),
      'criteria': new FormControl('', Validators.required),
      'metric': new FormControl('', Validators.required),
      'nfa_type': new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    const qe = QualifiyingExpression.resolve(
      this.nfatemplate.deComponent.deForm.get('qualifyingEx').value);

    let de = new BpPropertyTemplateNoConditionDe(
      this.nfatemplate.deComponent.deForm.get('nameNFA').value,
      null,
      this.nfatemplate.deComponent.deForm.get('characteristic').value,
      this.nfatemplate.deComponent.deForm.get('property').value,
      this.nfatemplate.deComponent.deForm.get('modalVerb').value,
      qe.fullDe(),
      this.nfatemplate.deComponent.deForm.get('verb').value);
    let en = new BpPropertyTemplateNoConditionEn(
      this.nfatemplate.enComponent.enForm.get('nameNFA').value,
      null,
      this.nfatemplate.enComponent.enForm.get('characteristic').value,
      this.nfatemplate.enComponent.enForm.get('property').value,
      this.nfatemplate.enComponent.enForm.get('modalVerb').value,
      qe.fullEn(),
      this.nfatemplate.enComponent.enForm.get('verb').value);

    let nfaCatalogModel = new  NfaCatalogModel(
      null,
      null,
      this.selectedType,
      this.nfatemplate.deComponent.deForm.get('chbox').value,
      this.nfatemplate.deComponent.deForm.get('valueInput').value,
      null,
      new  NfaCatalogBlueprintModel(de, en),
      null,
      null,
      null,
      null
    );

     this.dataStorageService.storeNfa(this.selectedMetric.id, nfaCatalogModel)
       .subscribe(
         (response: Response) => {
           console.log(response.json);
         }
       );
  }

  factorHasCriteria() {
    return (this.selectedFactor != null
      && this.selectedFactor.criteriaList != null
      && this.selectedFactor.criteriaList.length > 0);
  }

  criteriaHasMetric() {
    return (this.selectedCriteria != null
      && this.selectedCriteria.metricList != null
      && this.selectedCriteria.metricList.length > 0);
  }
}
