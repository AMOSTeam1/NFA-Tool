import {Component, Input, OnInit} from '@angular/core';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {LocalStorageService} from 'angular-web-storage';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';

@Component({
  selector: 'app-nfacatalog-item',
  templateUrl: './nfacatalog-item.component.html',
  styleUrls: ['./nfacatalog-item.component.css']
})
export class NfacatalogItemComponent implements OnInit {

  @Input() nfaFactor: NfaFactorModel;
  @Input() index: number;
  selectedNfs: NfaCatalogModel[]
  metrics: NfaMetric[];
  criertia: NfaCriteriaModel[];
  isSelected = false;
  factorNfs: NfaCatalogModel[];
  class: string;

  constructor(public local: LocalStorageService) {
  }

  ngOnInit() {
    /** read the project nfas from the local variable
     * get the nfas of the curret factor
     * check if the nfa of the current factor  is one of the project nfas then set the class according  to the condition result
     */
    if (this.local.get('selNfs') != null) {
      this.selectedNfs = this.local.get('selNfs');
      if (this.selectedNfs.length === 0) {
        this.class = 'list-group-item-text';
      }
      else {
        this.criertia = this.nfaFactor.criteriaList;
        for (const crt of this.criertia) {
          this.metrics = crt.metricList;
          for (const met of this.metrics) {
            this.factorNfs = met.nfaList;
            for (const nfa of this.factorNfs) {
              for (const selnfa of this.selectedNfs) {
                if (selnfa.id == nfa.id) {
                  this.class = 'list-group-item-success';
                }
              }

            }
          }
        }
      }
    }
    else{ this.class = 'list-group-item-text';}
  }
}
