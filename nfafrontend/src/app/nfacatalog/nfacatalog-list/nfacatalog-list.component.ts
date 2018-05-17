
import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from "../../shared/nfaCatalog.model";
import {DataStorageService} from "../../shared/data-storage.service";

import {NfacatalogService} from "../nfacatalog.service";
import {Response} from "@angular/http";
import {NfaFactorModel} from "../../shared/nfaFactor.model";

@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {


  // nfaCatalog: NfaCatalogModel[];
  nfaFactors: NfaFactorModel[];
  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[]=response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
  }


}
