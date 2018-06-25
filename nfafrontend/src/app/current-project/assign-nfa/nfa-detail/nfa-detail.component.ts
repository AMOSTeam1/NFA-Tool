import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IBlueprint} from "../../../shared/blueprints/IBlueprint.model";
import {ISubscription} from "rxjs/Subscription";
import {NfaCustomModel} from "../../../shared/nfaCustom.model";
import {Response} from "@angular/http";

@Component({
  selector: 'app-nfa-detail',
  templateUrl: './nfa-detail.component.html',
  styleUrls: ['./nfa-detail.component.css']
})
export class NfaDetailComponent implements OnInit, OnDestroy {
  nfa: NfaCatalogModel;
  nfadetailForm: FormGroup;
  id: number;
  editmode : boolean;

  private subscription: ISubscription[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private translateService: TranslateService) {
    this.subscription = [];
    this.initForm();
  }

  ngOnInit() {
    const subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['nfa_id'];
          this.nfa = this.currentProjectService.getNfa(this.id);

          const subscription = this.route.url.subscribe(value => this.editmode = (value.length>1 && (value[1].path == 'edit')));
          this.subscription.push(subscription);
        }
      );

    this.subscription.push(subscription);
  }

  ngOnDestroy() {
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onEditNFA() {
    if(this.editmode == false){
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }

  onBack(){
    if(this.editmode == true){
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onCancel(){
    this.onBack();
  }

  onSubmit(){
    console.log("onsubmit");
    switch(this.lang()){
      case 'de':
        this.nfa.blueprint.de.erklaerung = this.nfadetailForm.value['nfaExplanation'];
        break;
      case 'en':
      default:
        this.nfa.blueprint.en.erklaerung = this.nfadetailForm.value['nfaExplanation'];
        break;
    }


    let customNfa = new NfaCustomModel(
      this.nfa.nfaNumber,
      this.nfa.nfaCatalogId,
      this.nfa.value,
      this.nfa.formulation,
      this.nfa.blueprint,
      // this.nfa.nfaCatalogReference,
      this.nfadetailForm.value['nfaCatalogReference'],
      this.nfa.criticality,
      this.nfa.document
    );

    const subscription = this.dataStorageService.storeEditedNfa(customNfa).subscribe((response: Response) => console.log(response));
    this.subscription.push(subscription);

    this.onBack();
    console.log(customNfa);
    console.log("onsubmit done");
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

  getCurrentBlueprint() : IBlueprint{
    if (this.lang() === 'de') {
      return this.nfa.blueprint.de;
    } else {
      return this.nfa.blueprint.en;
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
