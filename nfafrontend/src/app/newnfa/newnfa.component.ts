import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
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


@Component({
  selector: 'app-newnfa',
  templateUrl: './newnfa.component.html',
  styleUrls: ['./newnfa.component.css']
})
export class NewnfaComponent implements OnInit, AfterViewInit {

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
  selectedNfa: NfaCatalogBlueprintModel;

  ngAfterViewInit() {
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
    console.log(this.nfatemplate.blueprintDeForm.getRawValue());
    let formObj = this.nfatemplate.blueprintDeForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);

    // this.nfatemplate.blueprintDeForm.

    let de = new BpPropertyTemplateNoConditionDe(
      this.nfatemplate.blueprintDeForm.get('nameNFA').value,
      this.nfatemplate.blueprintDeForm.get('characteristic').value,
      this.nfatemplate.blueprintDeForm.get('property').value,
      this.nfatemplate.blueprintDeForm.get('modalVerb').value,
      this.nfatemplate.blueprintDeForm.get('qualifyingEx').value,
      this.nfatemplate.blueprintDeForm.get('valueInput').value,
      this.nfatemplate.blueprintDeForm.get('verb').value);
    let en = new BpPropertyTemplateNoConditionEn(
      this.nfatemplate.blueprintEnForm.get('nameNFA').value,
      this.nfatemplate.blueprintEnForm.get('characteristic').value,
      this.nfatemplate.blueprintEnForm.get('property').value,
      this.nfatemplate.blueprintEnForm.get('modalVerb').value,
      this.nfatemplate.blueprintEnForm.get('qualifyingEx').value,
      this.nfatemplate.blueprintEnForm.get('valueInput').value,
      this.nfatemplate.blueprintEnForm.get('verb').value);

    let nfaCatalogModel = new  NfaCatalogModel(
      null,
      null,
      this.selectedType,
      null,
      null,
      this.nfatemplate.blueprintDeForm.get('valueInput').value,
      null,
      new  NfaCatalogBlueprintModel(de, en),
      null,
      null,
      null,
      null
    );

     this.dataStorageService.postNfa(this.selectedMetric.id, nfaCatalogModel)
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
