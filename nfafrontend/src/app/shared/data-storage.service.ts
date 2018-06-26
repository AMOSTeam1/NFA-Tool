import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import {Project} from './project.model';
import {NfaCatalogModel} from './nfaCatalog.model';
import {NfaCustomModel} from "./nfaCustom.model";

let headers = new Headers();
headers.append('content-type', 'application/json');
let opts = new RequestOptions();
opts.headers = headers;

@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}

  storeNfa(metricId: number, nfa: NfaCatalogModel) {
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/create' + metricId, nfa);
  }
  storeEditedNfa(customNfa: NfaCustomModel) {
    console.log("asda " + customNfa);
    let r = this.http.post('http://localhost:8080/nfabackend/webapi/nfa_edit/create', customNfa, opts);
    console.log(r);
    console.log("asda1");
    return r;
  }
  storeProject(newproject: Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', newproject);
  }

  getCurrentProjects() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/project');
  }
  deleteProject(project: Project) {
    return this.http.delete('http://localhost:8080/nfabackend/webapi/project/' + project.id);
  }
  getNfaCatalog() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/nfa_catalog');
  }
  getNfaFactor() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/nfa_factor');
  }

  updateProject(updatedProject: Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/edit', updatedProject);
  }

  getProjectByName(status: string, param: string ) {
   return this.http.get('http://localhost:8080/nfabackend/webapi/project/search?status=' + status +'&lookupCustName=' + param );
  }

  getTypes() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/types');
  }

}
