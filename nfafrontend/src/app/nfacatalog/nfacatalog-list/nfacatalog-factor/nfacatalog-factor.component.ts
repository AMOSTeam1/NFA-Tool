import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfaFactorModel} from "../../../shared/nfaFactor.model";
import {NfaCriteriaModel} from "../../../shared/nfaCriteria.model";

@Component({
  selector: 'app-nfacatalog-factor',
  templateUrl: './nfacatalog-factor.component.html',
  styleUrls: ['./nfacatalog-factor.component.css']
})
export class NfacatalogFactorComponent implements OnInit {

  @Input() nfaFactor: NfaFactorModel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
