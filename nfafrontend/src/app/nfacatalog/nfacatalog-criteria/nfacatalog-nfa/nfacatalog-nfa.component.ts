import {Component, OnDestroy, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfaMetricModel} from '../../../shared/nfaMetric.model';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {TranslateService} from '@ngx-translate/core';
import {CurrentProjectService} from '../../../current-project/current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {LocalStorageService} from 'angular-web-storage';
import {ISubscription} from "rxjs/Subscription";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NfaCustomModel} from "../../../shared/nfaCustom.model";
import {IBlueprint} from "../../../shared/blueprints/IBlueprint.model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {NfaInterfaceModel} from "../../../shared/nfaInterface.model";
import {DataexchangeService as DExchS} from "../../../shared/dataexchange.service";
import {NfaVerbindlichkeitModel} from "../../../shared/nfaVerbindlichkeit.model";

@Component({
  selector: 'app-nfacatalog-nfa',
  templateUrl: './nfacatalog-nfa.component.html',
  styleUrls: ['./nfacatalog-nfa.component.css']
})

export class NfacatalogNfaComponent implements OnInit, OnDestroy {

  page_is_in_project_mode: boolean = false;
  page_is_in_edit_mode : boolean = false;
  page_is_in_subnavigation_mode = true;

  project_id_param: number;

  factor_id_param: number;
  factor: NfaFactorModel;

  criteria_id_param: number;
  criteria: NfaCriteriaModel;

  metric_id_param: number;
  metric: NfaMetricModel;

  selected_nfa_id_in_all : number;
  selected_nfa_id_in_metric: number;

  metric_nfas: NfaCatalogModel[] = [];
  project_nfas: NfaCatalogModel[] = [];

  original_nfa: NfaCatalogModel;
  custom_nfa: NfaCustomModel;

  nfadetailForm: FormGroup;
  popupform:FormGroup;

  observable_nfa : Observable<NfaCatalogModel>;
  observable_custom_nfa : Observable<NfaCustomModel>;

  observable_erklaerungs_str : Observable<string>;
  erklarungs_str_observer : Observer<string>;

  nfaVerbindlichkeit: NfaVerbindlichkeitModel;


  private subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              public local: LocalStorageService,
  ) {
    //use observable, to store str_observer
    //to later change the content of this str everywhere it is using {{ observable_erklaerungs_str | async }}
    this.observable_erklaerungs_str = new Observable<string>(
      observer => {
        this.erklarungs_str_observer = observer;
      }
    );

    this.subscription = [];
    this.initForm();
  }

  ngOnInit() {
    //Get the Current Factor-ID and the Factor from this parents parameters
    let subscription = this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.factor_id_param= +params['factor_id'];
          this.factor = this.nfaCatalogService.getNfaFactor(this.factor_id_param);
        }
      );
    this.subscription.push(subscription);


    //Check if we are operating under the route "[parent-route]/[..]/[..]/edit"
    let subscriptionB = this.route.url.subscribe(value => {
      const index_of_edit : number = 2;
      this.page_is_in_edit_mode = (value.length>index_of_edit && (value[index_of_edit].path == 'edit'));
    });
    this.subscription.push(subscriptionB);


    //Get the Project from the Id, saved in the Parents, parents Route Parameters
    let subscriptionA = this.route.parent.parent.params
      .subscribe((params: Params) =>this.project_id_param = params['project_id']);
    this.subscription.push(subscriptionA);

    if (this.project_id_param != null) {
      this.nfaCatalogService.projectId = this.project_id_param;
      this.project_nfas = this.currentProjectService.getProjectById(this.project_id_param).projectNfas.slice();
    }
    this.subscription.push(subscription);

    //Get Criteria and Metric according to the given IDs
    this.selected_nfa_id_in_metric = 0;
    let subscriptionC = this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id_param = +params['criteria_id'];
          this.metric_id_param = +params['metric_id'];

          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param);
          this.metric = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param).metricList[this.metric_id_param];
          this.metric_nfas = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param).metricList[this.metric_id_param].nfaList;

          this.selected_nfa_id_in_all = this.metric_nfas[this.selected_nfa_id_in_metric].id;

          this.page_is_in_project_mode = this.local.get(DExchS.nfaMode);

          if(this.page_is_in_project_mode){
            this.original_nfa = this.currentProjectService.getNfa(this.selected_nfa_id_in_metric);

            if(this.custom_nfa){
              this.observable_custom_nfa = this.dataStorageService.getCustomNfa(this.custom_nfa.customId);
              let subscription2 = this.observable_custom_nfa
                .subscribe((value : NfaCustomModel) =>
                {
                  this.erklarungs_str_observer.next(this.erklaerung(value));
                  this.custom_nfa = value;
                });
              this.subscription.push(subscription2);
            }
          }

          this.observable_nfa = this.dataStorageService.getNfa(this.selected_nfa_id_in_all);
          let subscription1 = this.observable_nfa
            .subscribe((value : NfaCatalogModel) =>
            {
              if(this.erklarungs_str_observer){
                this.erklarungs_str_observer.next(this.erklaerung(value));
                this.original_nfa = value;
              }
            });
          this.subscription.push(subscription1);
        }
      );
    this.subscription.push(subscriptionC);


    let subscriptionX = this.route.parent.parent.params.subscribe(params => this.project_id_param = params['project_id']);
    this.subscription.push(subscriptionX);

    if (this.project_id_param != null) {
      this.nfaCatalogService.projectId = this.project_id_param;
      this.project_nfas = this.currentProjectService.getProjectById(this.project_id_param).projectNfas.slice();
    }


  }

  ngOnDestroy() {
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onEditNFA() {
    if(this.page_is_in_edit_mode == false){

      // this.erklarungs_str_observer.next(this.erklaerung(this.getRelevantNfa()));
      if(this.erklarungs_str_observer){
        this.erklarungs_str_observer.next("");
      }

      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }

  onEditBack(){
    if(this.page_is_in_edit_mode == true){
      if(this.erklarungs_str_observer){
        this.erklarungs_str_observer.next(this.erklaerung(this.getRelevantNfa()));
      }
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel(){
    this.onBack();
  }

  bezeichnung(nfa: NfaInterfaceModel) : string {

    if (this.getCurrentLanguage() === 'de') {
      return nfa.blueprint.de.bezeichnung;
    } else {
      return nfa.blueprint.en.bezeichnung;
    }
  }

  erklaerung(nfa: NfaInterfaceModel) : string {

    if (this.getCurrentLanguage() === 'de') {
      return nfa.blueprint.de.erklaerung;
    } else {
      return nfa.blueprint.en.erklaerung;
    }
  }

  // bezeichnung(nfa?: NfaInterfaceModel) : string { //TODO doesnt work. Syntax and logic is right, but Typescript sucks.
  //   if(!nfa){
  //     nfa = this.getRelevantNfa();
  //   }
  //
  //   return (<NfaCatalogBlueprintModel>nfa.blueprint).getBezeichnung(this.getCurrentLanguage());
  // }
  //
  // erklaerung(nfa?: NfaInterfaceModel) : string {
  //   if(!nfa){
  //     nfa = this.getRelevantNfa();
  //   }
  //   return (<NfaCatalogBlueprintModel>nfa.blueprint).getErklaerung(this.getCurrentLanguage());
  // }

  private getCurrentLanguage() {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = this.translateService.defaultLang;
    }
    return lang;
  }

  getCurrentBlueprint() : IBlueprint{
    let nfa = this.getRelevantNfa();

    if (this.getCurrentLanguage() === 'de') {
      return nfa.blueprint.de;
    } else {
      return nfa.blueprint.en;
    }
  }

  onNext() {
    this.selected_nfa_id_in_metric = this.selected_nfa_id_in_metric + 1;
  }

  onPrev() {
    this.selected_nfa_id_in_metric = this.selected_nfa_id_in_metric - 1;
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {

    switch(this.getCurrentLanguage()){
      case 'de':
        this.original_nfa.blueprint.de.erklaerung = this.nfadetailForm.value['nfaExplanation'];
        break;
      case 'en':
      default:
        this.original_nfa.blueprint.en.erklaerung = this.nfadetailForm.value['nfaExplanation'];
        break;
    }


    let customNfa = new NfaCustomModel(
      null,
      this.original_nfa.id,
      this.original_nfa.values,
      this.original_nfa.formulation,
      this.original_nfa.blueprint,
      // this.original_nfa.nfaCatalogReference,
      this.nfadetailForm.value['nfaCatalogReference'],
      this.original_nfa.criticality,
      this.original_nfa.document
    );

    const subscription = this.dataStorageService.storeEditedNfa(customNfa)
      .subscribe(
        response => {
          console.log("trying to store custom NFA");
          console.log(response);
        },
        err => {
          console.log("error while trying to store custom NFA");
          console.log(err);
        }
      );
    this.subscription.push(subscription);

    this.custom_nfa = customNfa;
    this.observable_custom_nfa = this.dataStorageService.getCustomNfa(this.custom_nfa.customId);
    let subscription2 = this.observable_custom_nfa
      .subscribe((value : NfaCustomModel) =>
      {
        this.erklarungs_str_observer.next(this.erklaerung(value));
        this.custom_nfa = value;
      });
    this.subscription.push(subscription2);

    this.onBack();
  }

  onNfaValueSubmit(){
    this.local.clear();

    const newNfaVerbindlichkeit = new NfaVerbindlichkeitModel(
      this.popupform.value['id'],
      this.popupform.value['nfaVerbindlichkeitFrom'],
      this.popupform.value['nfaVerbindlichkeitTill']
    );

  }

  private initForm() {
    let nfaVerbindlichkeitFrom = null;
    let nfaVerbindlichkeitTill = null;
    let nfaExplanation = '';
    let nfaName = '';
    let nfaCatalogReference = '';


    if (this.page_is_in_edit_mode) {
      let currentBlueprint = this.getCurrentBlueprint();

      nfaName = currentBlueprint.bezeichnung;
      nfaExplanation = currentBlueprint.erklaerung;
    }

    this.nfadetailForm = new FormGroup({
      'nfaExplanation': new FormControl(nfaExplanation),
      'nfaName': new FormControl(nfaName),
      'nfaCatalogReference': new FormControl(nfaCatalogReference),
    });
    this.popupform = new FormGroup({

      'nfaVerbindlichkeitFrom': new FormControl(nfaVerbindlichkeitFrom, Validators.required),
      'nfaVerbindlichkeitTill': new FormControl(nfaVerbindlichkeitTill, Validators.required),

    });

  }


  onNextY() {
  }

  onPrevY() {
  }

  onGoto(j: number) {
    this.selected_nfa_id_in_metric = j;
    this.page_is_in_subnavigation_mode = !this.page_is_in_subnavigation_mode;
  }

  getOutputErklaerung(){
    if(this.erklarungs_str_observer){
      return '{{this.erklarungs_str_observer | async}}';
    }
    return this.erklaerung(this.getRelevantNfa());
  }

  getRelevantNfa() : NfaInterfaceModel {
    if (this.custom_nfa){
      return this.custom_nfa;
    }else{
      return this.original_nfa;
    }
  }

  /**
   * Add an nfa to the savedNfas and store it locally
   * @param {NfaCatalogModel} selectedNfa
   */
  toggleSelectionNfa(selectedNfa : NfaCatalogModel){
    //Fetch the savedNfa list (either from project, or locally)
    let savedNfs = this.getSavedNfa();
    console.log("Toggle selection start " + this.nfaFoundInSavedNfas(selectedNfa, savedNfs));
    if(!this.nfaFoundInSavedNfas(selectedNfa, savedNfs)){
      //Add it to the List if its not yet there
      savedNfs.push(selectedNfa);


    }else{
      //Remove it from the List if it is there already
      const indexInStorage: number = savedNfs.indexOf(selectedNfa);
      savedNfs.splice(indexInStorage, 1);
    }

    //Update the locally stored list. It will be saved later on saving the project.
    this.local.set(DExchS.selNfs, savedNfs);
    console.log("Toggle selection end " + this.nfaFoundInSavedNfas(selectedNfa, savedNfs));
  }

  /**
   * Returns the Locally saved list of savedNfa
   * If the current list is still empty, fetch the original from the project and store it locally.
   *
   * @returns {NfaCatalogModel[]} List with the currently saved Nfas
   */
  private getSavedNfa() : NfaCatalogModel[]{

    //init the list with the currently stored nfa-list
    let savedNfs: NfaCatalogModel[] = this.local.get(DExchS.selNfs);

    if (savedNfs == null) {
      //init an empty list, to avoid nullptr
      savedNfs = [];
    }

    //if the the local list is empty, fetch the project list and store it locally
    if (savedNfs.length == 0 && this.project_nfas.length != 0) {
      this.local.set(DExchS.selNfs, this.project_nfas);
      savedNfs = this.local.get(DExchS.selNfs);
    }
    return savedNfs;
  }

  /**
   * Checks, whether a given nfa is part of the currently saved list
   *
   * @param {NfaCatalogModel} nfa The Nfa, of which the presence will be determined
   * @param {NfaCatalogModel[]} inList optional list, in which the Nfa will be searched. Otherwise the local one will be used.
   * @returns {boolean} true if nfa is found in the savedNfs List.
   */
  nfaFoundInSavedNfas(nfa: NfaCatalogModel, inList? : NfaCatalogModel[]) : boolean{
    //if a parameter is provided, use it, otherwise fetch the saved Nfas.
    let savedNfs : NfaCatalogModel[] = (inList) ? inList : this.getSavedNfa();

    const indexInStorage: number = savedNfs.indexOf(nfa);

    //true, if storage index equals anything but -1, false otherwise
    return (-1 !== indexInStorage);
  }
}


