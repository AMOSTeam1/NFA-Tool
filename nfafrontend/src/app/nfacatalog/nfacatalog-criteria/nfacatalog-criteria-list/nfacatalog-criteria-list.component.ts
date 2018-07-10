import {Component, OnDestroy, OnInit} from '@angular/core';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {ISubscription} from "rxjs/Subscription";
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-nfacatalog-criteria-list',
  templateUrl: './nfacatalog-criteria-list.component.html',
  styleUrls: ['./nfacatalog-criteria-list.component.css']
})
export class NfacatalogCriteriaListComponent implements OnInit, OnDestroy{

  showLoading = true;
  nfaCriterias: NfaCriteriaModel[];
  factor: NfaFactorModel;
  factor_id_param: number;
  subscription : ISubscription[];

  nfaFactors: NfaFactorModel[];
  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService
  ) {
    this.subscription = [];
  }

  ngOnInit() {

    let tempSubscription : ISubscription;

    let subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.factor_id_param = +params['factor_id'];

          if(tempSubscription){
            tempSubscription.unsubscribe();
          }

          tempSubscription = this.dataStorageService.getNfaFactors()
            .subscribe(response => {
                console.debug("Get nfa factors:");
                this.nfaFactors = response;
                this.nfaCatalogService.setNfaFactors(this.nfaFactors);
                console.debug(response);
                console.debug(this.factor_id_param);


                this.factor = this.nfaFactors[this.factor_id_param];
                this.nfaCriterias = this.factor.criteriaList;
                this.nfaCatalogService.setNfaCriterias(this.nfaCriterias);
                this.showLoading = false;
              },
              error1 => console.log(error1)
            );

        }
      );

    this.subscription.push(subscription);

  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  showCriteria(i: number){
    this.router.navigate(['../' + i], {relativeTo: this.route});
  }

}
