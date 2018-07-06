import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const response  = this.http.get('http://localhost:8080/nfabackend/webapi/user')
      .map((response: Response) => response.json());
    return response;
  }
}
