import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfacatalogService} from '../../nfacatalog.service';
import {NfaMetric} from '../../../shared/nfaMetric.model';

@Component({
  selector: 'app-nfacatalog-metric',
  templateUrl: './nfacatalog-metric.component.html',
  styleUrls: ['./nfacatalog-metric.component.css']
})
export class NfacatalogMetricComponent implements OnInit {

  nfaMetrics: NfaMetric[];
  criteria_id: number;
  private onView = true;
  metricIdx: number;
  nfaIdx: number;
  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.criteria_id = +params['criteria_id'];
          this.nfaMetrics = this.nfaCatalogService.getNfaCriteria(this.criteria_id).metricList;
          this.metricIdx = 0;
          this.nfaIdx = 0;
        }
      );

  }

  onNext(){
    this.metricIdx = this.metricIdx + 1;
  }
  onPrev() {
    this.metricIdx = this.metricIdx - 1;
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

}
