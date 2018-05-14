
import { Component, OnInit } from '@angular/core';
import {Nfa} from "../../shared/nfa.model";
import {NfaCatalogModel} from "../../shared/nfaCatalog.model";
import {DataStorageService} from "../../shared/data-storage.service";

import {NfacatalogService} from "../nfacatalog.service";


@Component({
  selector: 'app-nfacatalog-list',
  templateUrl: './nfacatalog-list.component.html',
  styleUrls: ['./nfacatalog-list.component.css']
})
export class NfacatalogListComponent implements OnInit {

  nfas: Nfa[];
  nfaCatalog: NfaCatalogModel[];
  constructor(private nfaCatalogService: NfacatalogService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getNfas()
      .subscribe(
        (response) => {
          this.nfas = response.json();
        }
      );
  }


}
