import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import {User} from '../user';
import {UserService} from '../user.service';
import {Http} from '@angular/http';


@Injectable()
export class BackendInterceptor implements HttpInterceptor {


  constructor(public userService: UserService,
              public user: User,
              public http: Http
  ) {

       console.log('execute backend.ts');

     }



     readUser() {

       this.userService.getUser()
         .subscribe(resp => {
           this.user =  resp.body;
         });


}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // authenticate
     const testUser = {id: this.user.userId, username: this.user.username, password: this.user.password};
    return Observable.of(null).mergeMap(() => {
    if (request.url.endsWith('/authenticate') && request.method === 'POST') {

      console.log('execute backend.ts INTERCEPT');

      this.readUser();
        if (request.body.username === testUser.username && request.body.password === testUser.password) {

          // if login details are valid return 200 OK with a fake jwt token
          return Observable.of(new HttpResponse({ status: 200, body: { token: 'token' } }));
        } else {
          // else return 400 bad request
          // TODO add translation
          return Observable.throw('Username or password is incorrect');

        }
      }

      // get users
      if (request.url.endsWith('/users') && request.method === 'GET') {
        this.readUser();
        if (request.headers.get('Authorization') === 'Bearer token') {

          return Observable.of(new HttpResponse({ status: 200, body: [testUser] }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);
    })
      .materialize()
      .delay(2000)
      .dematerialize();

  }
}

export let BackendProvider = {
  // use  backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
