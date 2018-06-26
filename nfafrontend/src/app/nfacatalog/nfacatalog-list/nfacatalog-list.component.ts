
import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from "../../shared/nfaCatalog.model";
import {DataStorageService} from "../../shared/data-storage.service";

import {NfacatalogService} from "../nfacatalog.service";

import {NfaFactorModel} from "../../shared/nfaFactor.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {

  nfaFactors: NfaFactorModel[];
  subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService)
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
  }

}
