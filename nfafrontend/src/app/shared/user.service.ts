import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
    console.log('execute user.service.ts');
  }

  getUser(): Observable<User> {
    console.log('execute user.service.ts GET');
    return this.http.get<User>('http://localhost:8080/nfabackend/webapi/user');

  }
}
