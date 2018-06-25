import {Component, OnDestroy, OnInit} from '@angular/core';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {ISubscription} from "rxjs/Subscription";
import {share} from "rxjs/operator/share";

@Component({
  selector: 'app-nfacatalog-criteria-list',
  templateUrl: './nfacatalog-criteria-list.component.html',
  styleUrls: ['./nfacatalog-criteria-list.component.css']
})
export class NfacatalogCriteriaListComponent implements OnInit, OnDestroy{

  nfaCriterias: NfaCriteriaModel[];
  nfaFactor: NfaFactorModel;
  id: number;
  subscription : ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute
  ) {
    this.subscription = [];
  }

  ngOnInit() {
    const subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
          this.nfaCriterias = this.nfaCatalogService.getNfaFactor(this.id).criteriaList;
          this.nfaCatalogService.setNfaCriterias(this.nfaCriterias);

        }
      );

    this.subscription.push(subscription);
  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

}
