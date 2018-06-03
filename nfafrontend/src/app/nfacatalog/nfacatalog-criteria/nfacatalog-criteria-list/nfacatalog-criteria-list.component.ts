import { Component, OnInit } from '@angular/core';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';

@Component({
  selector: 'app-nfacatalog-criteria-list',
  templateUrl: './nfacatalog-criteria-list.component.html',
  styleUrls: ['./nfacatalog-criteria-list.component.css']
})
export class NfacatalogCriteriaListComponent implements OnInit {


  nfaCriterias: NfaCriteriaModel[];
  nfaFactor: NfaFactorModel;
  id: number;

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
          this.nfaCriterias = this.nfaCatalogService.getNfaFactor(this.id).criteriaList;
        }
      );
  }

}
