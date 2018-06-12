import {Component, Input, OnInit} from '@angular/core';
import {NfaCriteriaModel} from '../../../../shared/nfaCriteria.model';

@Component({
  selector: 'app-nfacatalog-criteria-item',
  templateUrl: './nfacatalog-criteria-item.component.html',
  styleUrls: ['./nfacatalog-criteria-item.component.css']
})
export class NfacatalogCriteriaItemComponent implements OnInit {

  @Input() nfaCriteria: NfaCriteriaModel;
  @Input() index: number;
  @Input() nfaFactorNumber: number;

  constructor() { }

  ngOnInit() {
  }

}
