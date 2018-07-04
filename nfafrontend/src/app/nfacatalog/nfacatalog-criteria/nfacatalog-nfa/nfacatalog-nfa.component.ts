import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {TranslateService} from '@ngx-translate/core';
import {CurrentProjectService} from '../../../current-project/current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {ISubscription} from "rxjs/Subscription";
import {FormControl, FormGroup} from "@angular/forms";
import {NfaCustomModel} from "../../../shared/nfaCustom.model";
import {IBlueprint} from "../../../shared/blueprints/IBlueprint.model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {NfaInterfaceModel} from "../../../shared/nfaInterface.model";


//Define Lookup-Name in Local Storage
const selNfsName : string = 'selNfs';

@Component({
  selector: 'app-nfacatalog-nfa',
  templateUrl: './nfacatalog-nfa.component.html',
  styleUrls: ['./nfacatalog-nfa.component.css']
})

export class NfacatalogNfaComponent implements OnInit, OnDestroy {

  nfas: NfaCatalogModel[];
  id: number;
  nfa_id : number;
  nfaFactor: NfaFactorModel;
  criteria: NfaCriteriaModel;
  criteria_id: number;
  metric_id: number;
  metric: NfaMetric;
  private onView = true;
  nfaIdx: number;
  projectMode: boolean = false;
  projectNfs: NfaCatalogModel[] = [];
  checked :boolean;
  projectId: number;

  original_nfa: NfaCatalogModel;
  custom_nfa: NfaCustomModel;

  editmode : boolean;
  nfadetailForm: FormGroup;

  observable_nfa : Observable<NfaCatalogModel>;
  observable_custom_nfa : Observable<NfaCustomModel>;

  observable_erklaerungs_str : Observable<string>;
  erklarungs_str_observer : Observer<string>;


  private subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              public local: LocalStorageService,
  ) {
    this.observable_erklaerungs_str = new Observable<string>(
      observer => {
        this.erklarungs_str_observer = observer;
        console.log("DONE this.erklarungs_str_observer.");
        console.log(this.erklarungs_str_observer);
      }
    );

    this.subscription = [];
    this.initForm();
  }

  ngOnInit() {
    //Get the Current Factor-ID and the Factor
    let subscription;
    subscription = this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
        }
      );
    this.subscription.push(subscription);

    //Check if we are operating under the route "[parent-route]/[..]/[..]/edit"
    subscription = this.route.url.subscribe(value => {
      this.editmode = (value.length>2 && (value[2].path == 'edit'));
    });
    this.subscription.push(subscription);

    //Get the Project from the Id, saved in the Parents Route Parameters
    subscription = this.route.parent.parent.params
      .subscribe(params => this.projectId = params['id']);

    if (this.projectId != null) {
      this.nfaCatalogService.projectId = this.projectId;
      this.projectNfs = this.currentProjectService.getProject(this.projectId).projectNfas.slice();
    }
    this.subscription.push(subscription);

    //Get Criteria and Metric according to the given IDs
    this.nfaIdx = 0;
    subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id = +params['criteria_id'];
          this.metric_id = +params['metric_id'];

          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id);
          this.metric = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id];
          this.nfas = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id].nfaList;

          this.nfa_id = this.nfas[this.nfaIdx].id;

          this.original_nfa = this.currentProjectService.getNfa(this.nfaIdx);

          this.observable_nfa = this.dataStorageService.getNfa(this.nfa_id);
          let subscription1 = this.observable_nfa
            .subscribe((value : NfaCatalogModel) =>
            {
              if(this.erklarungs_str_observer){
                this.erklarungs_str_observer.next(this.erklaerung(value));
                this.original_nfa = value;
              }
            });
          this.subscription.push(subscription1);

          if(this.custom_nfa){
            this.observable_custom_nfa = this.dataStorageService.getCustomNfa(this.custom_nfa.nfaCustomId);
            let subscription2 = this.observable_custom_nfa
              .subscribe((value : NfaCustomModel) =>
              {
                this.erklarungs_str_observer.next(this.erklaerung(value));
                this.custom_nfa = value;
              });
            this.subscription.push(subscription2);
          }

        }
      );
    this.subscription.push(subscription);

    this.projectMode = this.local.get('nfaMode');
  }

  ngOnDestroy() {
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onEditNFA() {
    if(this.editmode == false){

      // this.erklarungs_str_observer.next(this.erklaerung(this.getRelevantNfa()));
      if(this.erklarungs_str_observer){
        console.log("empty field");
        this.erklarungs_str_observer.next("");
      }

      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }

  onEditBack(){
    if(this.editmode == true){
      if(this.erklarungs_str_observer){
        console.log("asdasd");
        this.erklarungs_str_observer.next(this.erklaerung(this.getRelevantNfa()));
      }
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel(){
    this.onBack();
  }

  bezeichnung(nfa: NfaInterfaceModel) : string {

    if (this.lang() === 'de') {
      return nfa.blueprint.de.bezeichnung;
    } else {
      return nfa.blueprint.en.bezeichnung;
    }
  }

  erklaerung(nfa: NfaInterfaceModel) : string {

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

  getCurrentBlueprint() : IBlueprint{
    if (this.lang() === 'de') {
      return this.original_nfa.blueprint.de;
    } else {
      return this.original_nfa.blueprint.en;
    }
  }

  onNext() {
    this.nfaIdx = this.nfaIdx + 1;
  }

  onPrev() {
    this.nfaIdx = this.nfaIdx - 1;
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(){
    switch(this.lang()){
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
      this.original_nfa.value,
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

    this.observable_custom_nfa = this.dataStorageService.getCustomNfa(this.custom_nfa.nfaCustomId);
    let subscription2 = this.observable_custom_nfa
      .subscribe((value : NfaCustomModel) =>
      {
        this.erklarungs_str_observer.next(this.erklaerung(value));
        this.custom_nfa = value;
      });
    this.subscription.push(subscription2);

    this.onBack();
  }

  private initForm() {
    let nfaExplanation = '';
    let nfaName = '';
    let nfaCatalogReference = '';
    if (this.editmode) {
      nfaName = this.getCurrentBlueprint().bezeichnung;
      nfaExplanation = this.getCurrentBlueprint().erklaerung;
    }

    this.nfadetailForm = new FormGroup({
      'nfaExplanation': new FormControl(nfaExplanation),
      'nfaCatalogReference': new FormControl(nfaCatalogReference),
    });
  }


  onNextY() {
  }

  onPrevY() {
  }

  onGoto(j: number) {
    this.nfaIdx = j;
    this.onView = !this.onView;
  }

  /*
        this function used to initialize the checkbox --checked property
   */
  inProject(nfsid: number) {
    this.checked = false;
    let savedNfs: NfaCatalogModel[] =  this.local.get(selNfsName);
    const  projNfas : NfaCatalogModel[] = [];

    if (savedNfs == null) {
      savedNfs = projNfas;
    }

    if(savedNfs.length == 0 && this.projectNfs.length != 0) {
      this.local.set(selNfsName, this.projectNfs);
      savedNfs =  this.local.get(selNfsName);
    }

    if (savedNfs.length ==0) {
      this.checked = false;
    }
    else {
      savedNfs.forEach((x) => {
      if (x.id == nfsid) {
        this.checked= true;
      }
    });
    }
    return this.checked;
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
   * this function used tto add original_nfa to the local variable selNfs
   * @param {NfaCatalogModel} selectedNfa
   */

  selectNfa(selectedNfa : NfaCatalogModel){

    let savedNfs: NfaCatalogModel[] =  this.local.get(selNfsName);
    const projNfas : NfaCatalogModel[] = [];

    if (savedNfs == null){
      savedNfs = projNfas;
    }

    if(savedNfs.length ==0 && this.projectNfs.length != 0) {
      this.local.set(selNfsName, this.projectNfs);
      savedNfs =  this.local.get(selNfsName);
    }

    if(savedNfs.length>0){
      let count = 0;
      savedNfs.forEach((x) => {
        if (x.id !== selectedNfa.id) {
          count = count +1;
        }
      });

      if(count>0) { //wtf? TODO what happens here?
        savedNfs.push(selectedNfa);
      }

    }
    else if (savedNfs.length == 0){
     savedNfs.push(selectedNfa);
    }
    this.local.set(selNfsName, savedNfs);
  }
 /*  to be used later when removing the checkbox
  else {
       const index: number = savedNfs.indexOf(selectedNfa);
       if (index !== -1) {
         savedNfs.splice(index, 1);
       }

     }*/


}


