import {HttpClient} from '@angular/common/http';
import {Nfa} from './nfa.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}
  postNfa(nfa: Nfa) {
    console.log(nfa);
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/' , nfa);
  }
}
