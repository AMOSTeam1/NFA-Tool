import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../../shared/nfaCatalog.model';
import {NfaFactorModel} from "../../../../shared/nfaFactor.model";
import {NfaCriteriaModel} from "../../../../shared/nfaCriteria.model";
import {NfacatalogFactorComponent} from "../nfacatalog-factor.component";

@Component({
  selector: 'app-nfacatalog-criteria',
  templateUrl: './nfacatalog-criteria.component.html',
  styleUrls: ['./nfacatalog-criteria.component.css']
})
export class NfacatalogCriteriaComponent implements OnInit {

  @Input() nfaCriteria: NfaCriteriaModel;
  @Input() index: number;
  @Input() criteria_number: number;

  constructor() { }

  ngOnInit() {
  }

}
