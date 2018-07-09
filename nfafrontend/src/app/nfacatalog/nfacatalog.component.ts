import {Component, OnDestroy, OnInit} from '@angular/core';
import {NfacatalogService} from './nfacatalog.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentProjectService} from '../current-project/current-project.service';
import {LocalStorageService} from 'angular-web-storage';

import {DataStorageService} from "../shared/data-storage.service";
import {ISubscription} from "rxjs/Subscription";
import {DataexchangeService as DExchS} from "../shared/dataexchange.service";

@Component({
  selector: 'app-nfacatalog',
  templateUrl: './nfacatalog.component.html',
  styleUrls: ['./nfacatalog.component.css']
})
export class NfacatalogComponent implements OnInit, OnDestroy {

  page_is_in_project_mode :boolean = false;
  private subscription: ISubscription[];

  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private local: LocalStorageService,
  ) {
    this.subscription = [];
  }

  ngOnInit() {
    if(this.local.get(DExchS.project_mode)){
      this.page_is_in_project_mode = true;
    }

    const subscription = this.dataStorageService.getNfaFactors()
      .subscribe(
        response => {
          this.nfaCatalogService.setNfaFactors(response);
        },
        error1 => console.log(error1)
      );
    this.subscription.push(subscription);
  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onBack() {
    this.currentProjectService.setProject(this.local.get(DExchS.currProject));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
