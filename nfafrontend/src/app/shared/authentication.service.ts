import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AuthenticationService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/authenticate', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.subject.next({ username: username });
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.subject.next();

  }
  getStatus(): Observable<any> {
    // return observable to be notified of status updates (login/logout)
    return this.subject.asObservable();
  }
}
