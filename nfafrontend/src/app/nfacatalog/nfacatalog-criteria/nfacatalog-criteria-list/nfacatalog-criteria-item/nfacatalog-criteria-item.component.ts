import {Component, Input, OnInit} from '@angular/core';
import {NfaCriteriaModel} from '../../../../shared/nfaCriteria.model';
import {LocalStorageService} from 'angular-web-storage';
import {NfaCatalogModel} from '../../../../shared/nfaCatalog.model';
import {NfaMetricModel} from '../../../../shared/nfaMetric.model';
import {DataexchangeService as DExchS} from "../../../../shared/dataexchange.service";


@Component({
  selector: 'app-nfacatalog-criteria-item',
  templateUrl: './nfacatalog-criteria-item.component.html',
  styleUrls: ['./nfacatalog-criteria-item.component.css']
})
export class NfacatalogCriteriaItemComponent implements OnInit {

  @Input() nfaCriteria: NfaCriteriaModel;
  @Input() index: number;
  @Input() nfaFactorNumber: number;

  selectedNfs: NfaCatalogModel[];
  metrics: NfaMetricModel[];
  factorNfs: NfaCatalogModel[];
  class: string;

  constructor(public local: LocalStorageService) {
  }

  ngOnInit() {

    /** read the project nfas from the local variable
     * get the nfas of the curret criteria
     * check if the original_nfa of the current criteria  is one of the project nfas then set the class according to the condition result
     */
    let stored = this.local.get(DExchS.selNfs);
    if (stored) {
      this.selectedNfs = stored;
      if (this.selectedNfs.length === 0) {
        this.class = 'list-group-item-text';
      }
      else {
          this.metrics = this.nfaCriteria.metricList;
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
    else{ this.class = 'list-group-item-text';}
  }

}
