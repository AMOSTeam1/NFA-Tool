import {Component, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../shared/nfaCatalog.model';
import {DataStorageService} from '../../shared/data-storage.service';

import {NfacatalogService} from '../nfacatalog.service';
import {NfaFactorModel} from '../../shared/nfaFactor.model';
import {NfaCriteriaModel} from '../../shared/nfaCriteria.model';
import {LocalStorageService} from 'angular-web-storage';
import {CurrentProjectService} from '../../current-project/current-project.service';
import {ISubscription} from "rxjs/Subscription";
import {DataexchangeService as DExchS} from "../../shared/dataexchange.service";

@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {


  nfaFactors: NfaFactorModel[] = [];
  criteria: NfaCriteriaModel[];
  nfa: NfaCatalogModel[];
  id: number;

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
    this.subscription.push(subscription);

    this.local.set(DExchS.project_mode, false);
  }

}
