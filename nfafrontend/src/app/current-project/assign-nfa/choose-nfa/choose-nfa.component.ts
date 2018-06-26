import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute  , Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {NfacatalogService} from '../../../nfacatalog/nfacatalog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {TranslateService} from '@ngx-translate/core';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-choose-nfa',
  templateUrl: './choose-nfa.component.html',
  styleUrls: ['./choose-nfa.component.css']
})
export class ChooseNfaComponent implements OnInit, OnDestroy {
  id: number;
  nfaform: FormGroup;
  nfaFactors: NfaFactorModel[];
  selectedFactor : NfaFactorModel = undefined;
  selectedCriteria : NfaCriteriaModel = undefined;
  selectedMetric: NfaMetric = undefined;

  subscription : ISubscription[];

  constructor(private route: ActivatedRoute,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,
              private router: Router,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.initForm();
    this.id = this.currentProjectService.getSelectedProjectId();
    const subscription = this.dataStorageService.getNfaFactors()
      .subscribe(
        response => {
          this.nfaFactors = response;
          this.nfaCatalogService.setNfaFactors(this.nfaFactors);
        }
      );
    this.subscription.push(subscription);
  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  private initForm () {

    this.nfaform = new FormGroup ({
      'factor' : new FormControl('', Validators.required),
      'criteria': new FormControl('', Validators.required),
      'metric': new FormControl('', Validators.required)
    });
  }

  isAlreadyAdded(nfa: NfaCatalogModel){
    const referProjectNfas = this.currentProjectService.getProject(this.id).projectNfas;
    let flag = false;
    referProjectNfas.forEach((x) => {
      if (x.nfaCatalogId === nfa.nfaCatalogId) {flag = true;}
    });
    return flag;
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

  onAddOrRemove(nfa: NfaCatalogModel){
    const editedProject = this.currentProjectService.getProject(this.id);
    const ind = editedProject.projectNfas.findIndex((x) => x.nfaCatalogId === nfa.nfaCatalogId)
    if (ind !== -1) {
      editedProject.projectNfas.splice(ind,1);
    } else {
      editedProject.projectNfas.push(nfa);
    }

    this.currentProjectService.updateProject(this.id, editedProject);
    const subscription = this.dataStorageService.updateProject(editedProject)
      .subscribe(
        response => {
          //When response is there, reload project
          this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
        }
      );
    this.subscription.push(subscription);
  }

  bezeichnung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.blueprint.de.bezeichnung;
    } else {
      return nfa.blueprint.en.bezeichnung;
    }
  }

  erklaerung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.blueprint.de.erklaerung;
    } else {
      return nfa.blueprint.en.erklaerung;
    }
  }

  private lang() {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = this.translateService.defaultLang;
    }
    return lang;
  }

}
