import { Component, OnInit } from '@angular/core';
import {NfacatalogService} from './nfacatalog.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import  {CurrentProjectService} from '../current-project/current-project.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
@Component({
  selector: 'app-nfacatalog',
  templateUrl: './nfacatalog.component.html',
  styleUrls: ['./nfacatalog.component.css']
})
export class NfacatalogComponent implements OnInit {

  projectMode :boolean = false;


  constructor(private nfaCatalogService: NfacatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private  currenttProjectService: CurrentProjectService,
              private local: LocalStorageService,
  ) {}

  ngOnInit() {
    this.projectMode = this.local.get('nfaMode');
  }
  onBack() {
    this.currenttProjectService.setProject(this.local.get('currProject'));
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
