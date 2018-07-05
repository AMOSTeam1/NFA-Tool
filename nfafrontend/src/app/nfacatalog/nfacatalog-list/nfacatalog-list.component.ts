
import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from '../../shared/nfaCatalog.model';
import {DataStorageService} from '../../shared/data-storage.service';

import {NfacatalogService} from '../nfacatalog.service';
import {Response} from '@angular/http';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfaMetric} from  '../../shared/nfaMetric.model';
import {NfaCriteriaModel} from '../../shared/nfaCriteria.model';
import {LocalStorageService} from 'angular-web-storage';
import {CurrentProjectService} from '../../current-project/current-project.service';
import {Project} from '../../shared/project.model';

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

  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService,
              private currentProjectService: CurrentProjectService,
              public local: LocalStorageService,
             ) { }

  ngOnInit() {
    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[] = response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
    this.project = this.local.get('currProject');
    this.projectNfs = this.currentProjectService.getProjectById(this.project.id).projectNfas.slice();
    if (this.project.id != null && this.local.get('selNfs') == null ){
      this.local.set('selNfs', this.projectNfs );
    }
  }
}
