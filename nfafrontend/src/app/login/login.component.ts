import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';  // needed for first() call
import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/first';


import {AuthenticationService} from '../shared/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  error = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService
   ) {
     translate.setDefaultLang('de');
    console.log('init login');

  }


  useLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    console.log('init coming -> onInit');
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log('init coming -> Login');
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .first()
      .subscribe(
        data => {
          console.log('init coming -> subscription return');
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.error('login aborted with following error:');
          console.error(error);
        });
  }
}
