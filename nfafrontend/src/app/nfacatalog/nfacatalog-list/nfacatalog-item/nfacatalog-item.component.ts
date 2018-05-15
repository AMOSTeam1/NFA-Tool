import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';

@Component({
  selector: 'app-nfacatalog-item',
  templateUrl: './nfacatalog-item.component.html',
  styleUrls: ['./nfacatalog-item.component.css']
})
export class NfacatalogItemComponent implements OnInit {

  @Input() nfaCatalog: NfaCatalogModel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
