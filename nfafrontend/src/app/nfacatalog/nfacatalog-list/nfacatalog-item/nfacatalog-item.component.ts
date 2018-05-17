import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfaFactorModel} from "../../../shared/nfaFactor.model";

@Component({
  selector: 'app-nfacatalog-item',
  templateUrl: './nfacatalog-item.component.html',
  styleUrls: ['./nfacatalog-item.component.css']
})
export class NfacatalogItemComponent implements OnInit {

  @Input() nfaFactor: NfaFactorModel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
