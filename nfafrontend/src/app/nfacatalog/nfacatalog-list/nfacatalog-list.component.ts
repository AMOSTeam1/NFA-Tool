
import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from '../../shared/nfaCatalog.model';
import {DataStorageService} from '../../shared/data-storage.service';

import {NfacatalogService} from '../nfacatalog.service';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfaMetric} from  '../../shared/nfaMetric.model';
import {NfaCriteriaModel} from '../../shared/nfaCriteria.model';
import {LocalStorageService} from 'angular-web-storage';
import {CurrentProjectService} from '../../current-project/current-project.service';
import {Project} from '../../shared/project.model';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {


  // nfaCatalog: NfaCatalogModel[];
  nfaFactors: NfaFactorModel[] = [];
  savedNfas: NfaCatalogModel[];
  savedFactors: NfaFactorModel[] = [];

  metrics: NfaMetric[] ;
  criteria: NfaCriteriaModel[];
  nfa: NfaCatalogModel[];
  id: number;
  projectNfs: NfaCatalogModel[];
  project: Project;

  nfaFactors: NfaFactorModel[];
  subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService,
              private currentProjectService: CurrentProjectService,
              public local: LocalStorageService,
             )
  {
    this.subscription = [];
  }

  ngOnInit() {
    const subscription = this.dataStorageService.getNfaFactors()
      .subscribe(
        response => {
          this.nfaFactors = response;
          this.nfaCatalogService.setNfaFactors(this.nfaFactors);
        }
      );
    this.project = this.local.get('currProject');
    this.projectNfs = this.currentProjectService.getProject(this.project.id).projectNfas.slice();
    if (this.project.id != null && this.local.get('selNfs') == null ){
      this.local.set('selNfs', this.projectNfs );
    }
    this.subscription.push(subscription);
  }

}
