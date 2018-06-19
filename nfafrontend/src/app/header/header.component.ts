import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService,
              private  local: LocalStorageService,) {
    translate.setDefaultLang('de');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

  clearLocal()
  {
    this.local.clear();
  }

}
