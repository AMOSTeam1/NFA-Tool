import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {NfacatalogService} from '../../../nfacatalog/nfacatalog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {Response} from '@angular/http';

@Component({
  selector: 'app-choose-nfa',
  templateUrl: './choose-nfa.component.html',
  styleUrls: ['./choose-nfa.component.css']
})
export class ChooseNfaComponent implements OnInit {

  nfaform: FormGroup;
  nfaFactors: NfaFactorModel[];

  selectedFactor : NfaFactorModel = undefined;
  selectedCriteria : NfaCriteriaModel = undefined;
  selectedMetric: NfaMetric = undefined;

  constructor(private route: ActivatedRoute,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              private router: Router) { }

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

  private initForm () {

    this.nfaform = new FormGroup ({
      'factor' : new FormControl('', Validators.required),
      'criteria': new FormControl('', Validators.required),
      'metric': new FormControl('', Validators.required)
    });
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

  MetricHasNfa() {
    return (this.selectedMetric != null
      && this.selectedMetric.nfaList != null
      && this.selectedMetric.nfaList.length > 0);
  }

  updateCriteria(){
    this.selectedMetric = this.selectedCriteria.metricList[0];
  }

  updateFactor(){
    this.selectedCriteria = this.selectedFactor.criteriaList[0];
    this.selectedMetric = this.selectedCriteria.metricList[0];
  }

}
