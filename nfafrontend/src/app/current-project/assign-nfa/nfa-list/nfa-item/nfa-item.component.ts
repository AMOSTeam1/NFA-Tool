import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../../shared/nfaCatalog.model';

@Component({
  selector: 'app-nfa-item',
  templateUrl: './nfa-item.component.html',
  styleUrls: ['./nfa-item.component.css']
})
export class NfaItemComponent implements OnInit {

  @Input() nfaCatalog: NfaCatalogModel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
