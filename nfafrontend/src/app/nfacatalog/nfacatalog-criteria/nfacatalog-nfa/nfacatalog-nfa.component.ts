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
import {FormControl, FormGroup} from "@angular/forms";
import {NfaCustomModel} from "../../../shared/nfaCustom.model";
import {IBlueprint} from "../../../shared/blueprints/IBlueprint.model";
import {NfaInterfaceModel} from "../../../shared/nfaInterface.model";
import {DataexchangeService as DExchS} from "../../../shared/dataexchange.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-nfacatalog-nfa',
  templateUrl: './nfacatalog-nfa.component.html',
  styleUrls: ['./nfacatalog-nfa.component.css']
})

export class NfacatalogNfaComponent implements OnInit, OnDestroy {

  private page_is_in_project_mode: boolean = false;
  private page_is_in_edit_mode : boolean = false;
  private page_is_in_subnavigation_mode = true;

  selected_nfa_has_custom : boolean = false;

  project_id_param: number;

  factor_id_param: number;
  factor: NfaFactorModel;

  criteria_id_param: number;
  criteria: NfaCriteriaModel;

  metric_id_param: number;
  metric: NfaMetricModel;

  selected_nfa_id_in_metric: number;

  metric_nfas: NfaCatalogModel[] = [];
  project_nfas: NfaCatalogModel[] = [];

  original_nfa: NfaCatalogModel;
  custom_nfa: NfaCustomModel;

  nfadetailForm: FormGroup;

  observable_nfa : Subject<NfaCatalogModel> = new Subject<NfaCatalogModel>();
  observable_custom_nfa : Subject<NfaCustomModel> = new Subject<NfaCustomModel>();
  shown_nfa : NfaCatalogModel;

  private subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              public local: LocalStorageService,
  ) {
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


    //Get Criteria and Metric according to the given IDs
    this.selected_nfa_id_in_metric = 0;

    //Get the Project from the Id, saved in the Parents, parents Route Parameters
    let subscriptionA = this.route.parent.parent.params
      .subscribe((params: Params) =>{
        this.project_id_param = params['project_id'];

        //Init page_is_in_project_mode either from storage or manually
        if(this.local.hasOwnProperty(DExchS.project_mode)) {
          this.page_is_in_project_mode = this.local.get(DExchS.project_mode);
        }else{

          if ( this.project_id_param ) {

            this.page_is_in_project_mode = true;
            this.nfaCatalogService.projectId = this.project_id_param;
            this.project_nfas = this.currentProjectService.getProjectById(this.project_id_param).projectNfas.slice();

            let tempSelected = this.currentProjectService.getSelectedNfa();
            if(tempSelected){
              this.selected_nfa_id_in_metric = tempSelected;
            }

          } else {
            //Use the else path to set page_is_in_project_mode to false, to also cover undefined and null states of project_id_param
            this.page_is_in_project_mode = false;
          }
        }
      });
    this.subscription.push(subscriptionA);

    this.subscription.push(
      this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id_param = +params['criteria_id'];
          this.metric_id_param = +params['metric_id'];

          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param);
          this.metric = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param).metricList[this.metric_id_param];
          this.metric_nfas = this.nfaCatalogService.getNfaCriteria(this.criteria_id_param).metricList[this.metric_id_param].nfaList;

          //Subscribe to observable, so whenever next function is called, an update is triggered
          this.subscription.push(
            this.observable_nfa
              .subscribe(value => this.updateOriginalNfa(value))
          );

          if (this.page_is_in_project_mode) {

            //Subscribe to observable, so whenever next function is called, an update is triggered
            this.subscription.push(
              this.observable_custom_nfa
                .subscribe(value => this.updateCustomNfa(value))
            );
          }

          //Initialize original and custom via the Next function
          this.updateShownNfa();
        }
      ));



    this.subscription.push(
      this.route.parent.parent.params.subscribe(params => this.project_id_param = params['project_id'])
    );

    if (this.project_id_param) {
      this.nfaCatalogService.projectId = this.project_id_param;
      this.project_nfas = this.currentProjectService.getProjectById(this.project_id_param).projectNfas.slice();
    }

    this.updateShownNfa();
  }

  ngOnDestroy() {
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onEditNFA() {
    if(this.page_is_in_edit_mode == false){
      this.currentProjectService.setSelectedNfa(this.selected_nfa_id_in_metric);

      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }

  onEditBack(){
    if(this.page_is_in_edit_mode == true){

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

  private getCurrentLanguage() {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = this.translateService.defaultLang;
    }
    return lang;
  }

  getCurrentBlueprint() : IBlueprint {
    let nfa = this.getCurrentNfa();
    // let nfa = this.getRelevantNfa();

    if (this.getCurrentLanguage() === 'de') {
      return nfa.blueprint.de;
    } else {
      return nfa.blueprint.en;
    }
  }

  onNext() {
    this.selected_nfa_id_in_metric = this.selected_nfa_id_in_metric + 1;
    this.updateShownNfa();
  }

  onPrev() {
    this.selected_nfa_id_in_metric = this.selected_nfa_id_in_metric - 1;
    this.updateShownNfa();
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
    this.updateShownNfa();
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
      this.original_nfa,
      this.currentProjectService.getProject(),
      this.original_nfa.values,
      this.original_nfa.formulation,
      this.original_nfa.blueprint,
      // this.original_nfa.nfaCatalogReference,
      this.nfadetailForm.value['nfaCatalogReference'],
      this.original_nfa.criticality,
      this.original_nfa.document
    );

    this.subscription.push(
      this.dataStorageService.storeEditedNfa(this.project_id_param, this.original_nfa.id, customNfa)
      .subscribe(
        //TODO Why do we never execute this code? What is still going wrong?
        response => {
          console.log("trying to store custom NFA");
          console.log(response);
        },
        err => {
          console.log("error while trying to store custom NFA");
          console.log(err);
        }
      )
    );

    this.subscription.push(
      this.dataStorageService.getCustomNfaPerProject(this.project_id_param).subscribe(
        value => this.currentProjectService.setCustomNfa(value)
      )
    );

    this.observable_custom_nfa.next(customNfa);

    this.onBack();
  }

  private initForm() {
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
  }

  onGoto(j: number) {
    this.selected_nfa_id_in_metric = j;
    this.page_is_in_subnavigation_mode = !this.page_is_in_subnavigation_mode;

    this.updateShownNfa();
  }

  getCurrentNfa() : NfaCatalogModel {
    if(this.page_is_in_project_mode){
      return this.shown_nfa;
    }else{
      return this.metric_nfas[this.selected_nfa_id_in_metric];
    }
  }

  updateShownNfa(){
    this.selected_nfa_has_custom = false;

    this.observable_nfa.next(this.metric_nfas[this.selected_nfa_id_in_metric]);

    if(this.page_is_in_project_mode){
      this.observable_custom_nfa.next(this.currentProjectService.getCustomNfa(this.metric_nfas[this.selected_nfa_id_in_metric].id));
    }
  }

  updateCustomNfa(custom: NfaCustomModel) : void {
    this.selected_nfa_has_custom = false;

    if(custom){
      this.selected_nfa_has_custom = true;
      this.custom_nfa = custom;

      //todo store only changed values in shown nfa
      this.shown_nfa.blueprint = custom.blueprint;
    }
  }

  updateOriginalNfa(original: NfaCatalogModel) : void {
    this.original_nfa = original;
    if(!this.selected_nfa_has_custom){
      this.shown_nfa = original;
    }
  }

  getNfa(originalId: number) : NfaInterfaceModel {
    let custom : NfaCustomModel = this.currentProjectService.getCustomNfa(originalId);

    if(custom){
      return custom;
    }

    return this.metric_nfas[this.selected_nfa_id_in_metric];
  }

  /**
   * Add an nfa to the savedNfas and store it locally
   * @param {NfaCatalogModel} selectedNfa
   */
  toggleSelectionNfa(selectedNfa : NfaCatalogModel){
    //Fetch the savedNfa list (either from project, or locally)
    let savedNfs = this.getSavedNfa();

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


