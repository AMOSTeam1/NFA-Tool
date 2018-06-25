import { Component, OnInit } from '@angular/core';
import {NfaCriteriaModel} from '../../../shared/nfaCriteria.model';
import {NfacatalogService} from '../../nfacatalog.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NfaFactorModel} from '../../../shared/nfaFactor.model';
import {Response} from "@angular/http";
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-nfacatalog-criteria-list',
  templateUrl: './nfacatalog-criteria-list.component.html',
  styleUrls: ['./nfacatalog-criteria-list.component.css']
})
export class NfacatalogCriteriaListComponent implements OnInit {


  nfaCriterias: NfaCriteriaModel[];
  nfaFactor: NfaFactorModel;
  id: number;
  nfaFactors: NfaFactorModel[];
  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.nfaFactor = this.nfaCatalogService.getNfaFactor(this.id);
          this.nfaCriterias = this.nfaCatalogService.getNfaFactor(this.id).criteriaList;
          this.nfaCatalogService.setNfaCriterias(this.nfaCriterias);
        }
      );
    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[] = response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
  }

  showCriteria(i: number){
    this.router.navigate(['nfacatalog/list/' + i]);
  }

}
