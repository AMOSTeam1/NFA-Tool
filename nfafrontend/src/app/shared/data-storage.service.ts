import {Nfa} from './nfa.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from '../newproject/project.model';
import {Currentproject} from './currentproject.model';


@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}
  postNfa(nfa: Nfa) {
    console.log(nfa);
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/' , nfa);
  }
  storeProject(newproject: Project) {
    console.log(newproject);
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', newproject);
  }

  getCurrentProjects() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/project');
  }
  deleteProject(project: Currentproject) {
    return this.http.delete('http://localhost:8080/nfabackend/webapi/project/' + project.id);
  }
}
