import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

import {NfacatalogService} from '../nfacatalog/nfacatalog.service';
import {NfaFactorModel} from '../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../shared/nfaCriteria.model';
import {NfaMetricModel} from '../shared/nfaMetric.model';
import {NfatemplateComponent} from './nfatemplate/nfatemplate.component';
import {NfaCatalogBlueprintModel} from '../shared/nfaCatalogBlueprint.model';
import {BpPropertyTemplateNoCondition} from '../shared/blueprints/bpPropertyTemplateNoCondition.model';
import {NfaCatalogModel} from '../shared/nfaCatalog.model';
import {QualifiyingExpression} from '../shared/blueprints/QualifiyingExpression.model';
import {ISubscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-newnfa',
  templateUrl: './newnfa.component.html',
  styleUrls: ['./newnfa.component.css']
})
export class NewnfaComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              private translateService: TranslateService) {
    this.subscription = [];
  }

  nfaform: FormGroup;
  nfaFactors: NfaFactorModel[];
  @ViewChild(NfatemplateComponent) nfatemplate;

  selectedFactor: NfaFactorModel = undefined;
  selectedCriteria: NfaCriteriaModel = undefined;
  selectedMetric: NfaMetricModel = undefined;
  selectedType: any;
  valid = false;

  validUpdate = (value: boolean) => {
    this.valid = value;
  };

  private subscription: ISubscription[];

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.initForm();

    const subscription = this.dataStorageService.getNfaFactors()
      .subscribe(
        response => {
          this.nfaFactors = response;
          this.nfaCatalogService.setNfaFactors(this.nfaFactors);
        }
      );
    this.subscription.push(subscription);
  }

  ngOnDestroy() {
    for(let item of this.subscription){
      item.unsubscribe();
    }
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

    const qualifiyingExpression = QualifiyingExpression.resolve(
      this.nfatemplate.deComponent.deForm.get('qualifyingEx').value);

    let de = new BpPropertyTemplateNoCondition(
      this.nfatemplate.deComponent.deForm.get('nameNFA').value,
      null,
      this.nfatemplate.deComponent.deForm.get('characteristic').value,
      this.nfatemplate.deComponent.deForm.get('property').value,
      this.nfatemplate.deComponent.deForm.get('modalVerb').value,
      qualifiyingExpression.fullDe(),
      this.nfatemplate.deComponent.deForm.get('verb').value);

    let en = new BpPropertyTemplateNoCondition(
      this.nfatemplate.enComponent.enForm.get('nameNFA').value,
      null,
      this.nfatemplate.enComponent.enForm.get('characteristic').value,
      this.nfatemplate.enComponent.enForm.get('property').value,
      this.nfatemplate.enComponent.enForm.get('modalVerb').value,
      qualifiyingExpression.fullEn(),
      this.nfatemplate.enComponent.enForm.get('verb').value);

    let nfaCatalogModel = new NfaCatalogModel(
      null,
      null,
      this.selectedType,
      this.nfatemplate.deComponent.deForm.get('chbox').value,
      this.nfatemplate.deComponent.deForm.get('valueInput').value,
      null,
      new NfaCatalogBlueprintModel(de, en),
      null,
      null,
      null,
      null
    );

    this.dataStorageService.storeNfa(this.selectedMetric.id, nfaCatalogModel)
      .subscribe(
        response => {
          console.log(response);
        },
        error1 => {
          console.log(error1);
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
