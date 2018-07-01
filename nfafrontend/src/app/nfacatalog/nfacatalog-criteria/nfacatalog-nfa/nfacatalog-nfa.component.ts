import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
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

@Component({
  selector: 'app-nfacatalog-nfa',
  templateUrl: './nfacatalog-nfa.component.html',
  styleUrls: ['./nfacatalog-nfa.component.css']
})
export class NfacatalogNfaComponent implements OnInit {

  nfas: NfaCatalogModel[];
  id: number;
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


  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              public local: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
        }
      );

    this.nfaIdx = 0;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id = +params['criteria_id'];
          this.metric_id = +params['metric_id'];
          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id);
          this.metric = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id];
          this.nfas = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id].nfaList;
        }
      );
    this.route.parent.parent.params.subscribe(params => this.projectId = params['id']);
    if (this.projectId != null) {
      this.nfaCatalogService.projectId = this.projectId;
      this.projectNfs = this.currentProjectService.getProject(this.projectId).projectNfas.slice();
    }
    this.projectMode = this.local.get('nfaMode');
  }
  bezeichnung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.nfaCatalogBlueprint.de.bezeichnung;
    } else {
      return nfa.nfaCatalogBlueprint.en.bezeichnung;
    }
  }

  erklaerung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.nfaCatalogBlueprint.de.erklaerung;
    } else {
      return nfa.nfaCatalogBlueprint.en.erklaerung;
    }
  }

  private lang() {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = this.translateService.defaultLang;
    }
    return lang;
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
      let savedNfs: NfaCatalogModel[] =  this.local.get('selNfs');
      const  projNfas : NfaCatalogModel[] = [];
      if (savedNfs == null){ savedNfs = projNfas;}
      if(savedNfs.length == 0 && this.projectNfs.length != 0) {
      this.local.set('selNfs', this.projectNfs);
      savedNfs =  this.local.get('selNfs'); }

    if (savedNfs.length ==0) {
      this.checked = false;
    }
    else {
      savedNfs.forEach((x) => {
      if (x.nfaCatalogId == nfsid) {
        this.checked= true;
      }
    });
  }
    return  this.checked;
  }



  /**
   * this function used tto add nfa to the local variable selNfs
   * @param {NfaCatalogModel} selectedNfa
   */

  selectNfa(selectedNfa : NfaCatalogModel){
      let savedNfs: NfaCatalogModel[] =  this.local.get('selNfs');
     const  projNfas : NfaCatalogModel[] = [];
      if (savedNfs == null){ savedNfs = projNfas;}
      if(savedNfs.length ==0 && this.projectNfs.length != 0) {
      this.local.set('selNfs', this.projectNfs);
      savedNfs =  this.local.get('selNfs'); }

      if(savedNfs.length>0){
        let count = 0
        savedNfs.forEach((x) => {
          if (x.nfaCatalogId !== selectedNfa.nfaCatalogId) {
            count = count +1;
          }
        });
          if(count>0) {savedNfs.push(selectedNfa);}
      }
    else  if (savedNfs.length == 0){
       savedNfs.push(selectedNfa);
       console.log(savedNfs);
      }
    this.local.set('selNfs', savedNfs);
  }
 /*  to be used later when removing the checkbox
  else {
       const index: number = savedNfs.indexOf(selectedNfa);
       if (index !== -1) {
         savedNfs.splice(index, 1);
       }

     }*/
}


