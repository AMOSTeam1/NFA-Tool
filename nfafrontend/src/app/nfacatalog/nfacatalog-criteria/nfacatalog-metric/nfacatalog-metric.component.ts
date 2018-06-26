import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfacatalogService} from '../../nfacatalog.service';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {NfaFactorModel} from "../../../shared/nfaFactor.model";
import {NfaCriteriaModel} from "../../../shared/nfaCriteria.model";
import {LocalStorageService} from 'angular-web-storage';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';

@Component({
  selector: 'app-nfacatalog-metric',
  templateUrl: './nfacatalog-metric.component.html',
  styleUrls: ['./nfacatalog-metric.component.css']
})
export class NfacatalogMetricComponent implements OnInit {

  nfaMetrics: NfaMetric[];
  criteria_id: number;
  id: number;
  nfaFactor: NfaFactorModel;
  criteria: NfaCriteriaModel;
  private onView = true;
  metricIdx: number;
  nfaIdx: number;

  selectedNfs: NfaCatalogModel[]
  factorNfs: NfaCatalogModel[];
  isSelected = false;
  class: string;

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              public local: LocalStorageService
  ) { }

  ngOnInit() {

    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id = +params['criteria_id'];
          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id);
          this.nfaMetrics = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList;
          this.metricIdx = 0;
          this.nfaIdx = 0;
        }
      );
    this.isMetricSelected();
  }

  onNext(){
    this.metricIdx = this.metricIdx + 1;
    this.isMetricSelected();
  }
  onPrev() {
    this.metricIdx = this.metricIdx - 1;
    this.isMetricSelected();
  }

  onNfa(){
    this.router.navigate([this.metricIdx], {relativeTo: this.route});
  }

  onNextY(){
  }
  onPrevY() {
  }

  onGoto(j: number){
    this.metricIdx = j;
    this.onView = !this.onView;
  }

  /**
   * this function is used to check if the metric should be hihlighted or not
   */
  isMetricSelected(){
    this.isSelected= false;
    /** read the project nfas from the local variable
     * get the nfas of the curret metric
     * check if the nfa of the current metric  is one of the projec nfas then set iseselcted by the condition result
     */
    if (this.local.get('selNfs') != null) {
      this.selectedNfs = this.local.get('selNfs');
      if (this.selectedNfs.length === 0) {
        this.class = 'list-group-item-text';
      }
      else {
        this.factorNfs = this.nfaMetrics[this.metricIdx].nfaList;
        for (const nfa of this.factorNfs) {
          for (const selnfa of this.selectedNfs) {
            if (selnfa.nfaCatalogId == nfa.nfaCatalogId) {
              this.isSelected = true;
            }
          }
        }
      }
    }
    else{ this.isSelected = false;}
  }

}
