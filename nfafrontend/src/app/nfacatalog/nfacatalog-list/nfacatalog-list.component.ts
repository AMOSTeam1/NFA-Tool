
import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from "../../shared/nfaCatalog.model";
import {DataStorageService} from "../../shared/data-storage.service";

import {NfacatalogService} from "../nfacatalog.service";
import {Response} from "@angular/http";


@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {


  nfaCatalog: NfaCatalogModel[];
  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getNfaCatalog()
      .subscribe(
        (response: Response) => {
          const nfaCatalog: NfaCatalogModel[]=response.json();
          this.nfaCatalogService.setnfaCatalogs(nfaCatalog);
          this.nfaCatalog = response.json();
        }
      );
  }


}
