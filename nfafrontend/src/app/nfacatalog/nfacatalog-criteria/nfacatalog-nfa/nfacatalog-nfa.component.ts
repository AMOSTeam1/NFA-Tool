import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfaMetric} from '../../../shared/nfaMetric.model';
import {NfaFactorModel} from "../../../shared/nfaFactor.model";
import {NfaCriteriaModel} from "../../../shared/nfaCriteria.model";

@Component({
  selector: 'app-nfacatalog-nfa',
  templateUrl: './nfacatalog-nfa.component.html',
  styleUrls: ['./nfacatalog-nfa.component.css']
})
export class NfacatalogNfaComponent implements OnInit {

  nfas: NfaCatalogModel[];
  id: number;
  nfaFactor: NfaFactorModel;
  criteria: NfaCriteriaModel;
  criteria_id: number;
  metric_id: number;
  metric: NfaMetric;
  private onView = true;
  nfaIdx: number;
  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
        }
      );

    this.nfaIdx = 0;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id = +params['criteria_id'];
          this.metric_id = +params['metric_id'];
          this.criteria = this.nfaCatalogService.getNfaCriteria(this.criteria_id);
          this.metric = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id];
          this.nfas = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList[this.metric_id].nfaList;
        }
      );

  }

  onNext(){
    this.nfaIdx = this.nfaIdx + 1;
  }
  onPrev() {
    this.nfaIdx = this.nfaIdx - 1;
  }

  onBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onNextY(){
  }
  onPrevY() {
  }

  onGoto(j: number){
    this.nfaIdx = j;
    this.onView = !this.onView;
  }

}
