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



@Injectable()
export class BackendInterceptor implements HttpInterceptor {


  constructor(public userService: UserService,
              public user: User
  ) {

       console.log('execute backend.ts');

     }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('execute backend.ts INTERCEPT');


/*   this.user.user_id = 1;
   this.user.username = 'test';
   this.user.password = 'test';*/


    // wrap in delayed observable to simulate server api call
  //  return Observable.of(null).mergeMap(() => {

      // authenticate

    const testUser = {id: this.user.user_id, username: this.user.username, password: this.user.password};
      if (request.url.endsWith('/authenticate') && request.method === 'POST') {

        this.userService.getUser()
        .subscribe(data => {
          this.user = data;
        });


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
        this.userService.getUser()
          .subscribe(data => {
            this.user = data;
          });
        if (request.headers.get('Authorization') === 'Bearer token') {
          return Observable.of(new HttpResponse({ status: 200, body: [testUser] }));
        } else {
          // return 401 not authorised if token is null or invalid
          return Observable.throw('Unauthorised');
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

   /* })

    // call materialize and dematerialize to ensure delay even if an error is thrown
      .materialize()
      .delay(500)
      .dematerialize();*/
  }
}

export let BackendProvider = {
  // use  backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
