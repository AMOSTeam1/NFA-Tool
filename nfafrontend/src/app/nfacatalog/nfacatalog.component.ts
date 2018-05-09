import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Nfa} from '../shared/nfa.model';
import {Response} from '@angular/http';
import {NfaCatalogModel} from "../shared/nfaCatalog.model";

@Component({
  selector: 'app-nfacatalog',
  templateUrl: './nfacatalog.component.html',
  styleUrls: ['./nfacatalog.component.css']
})
export class NfacatalogComponent implements OnInit {

  nfas: Nfa[];
  nfaCatalog: NfaCatalogModel[];
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getNfas()
      .subscribe(
        (response: Response) => {
          this.nfas = response.json();
          this.nfaCatalog=response.json();
        }
      );
  }


}
