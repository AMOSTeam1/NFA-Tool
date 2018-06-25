import {Component, OnDestroy, OnInit} from '@angular/core';
import {NfacatalogService} from './nfacatalog.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import  {CurrentProjectService} from '../current-project/current-project.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {NfaFactorModel} from "../shared/nfaFactor.model";
import {Response} from "@angular/http";
import {DataStorageService} from "../shared/data-storage.service";
import {ISubscription} from "rxjs/Subscription";
@Component({
  selector: 'app-nfacatalog',
  templateUrl: './nfacatalog.component.html',
  styleUrls: ['./nfacatalog.component.css']
})
export class NfacatalogComponent implements OnInit, OnDestroy {

  projectMode :boolean = false;
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
    this.projectMode = this.local.get('nfaMode');

    const subscription = this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[] = response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
        }
      );
    this.subscription.push(subscription);
  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }

  onBack() {
    this.currentProjectService.setProject(this.local.get('currProject'));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
