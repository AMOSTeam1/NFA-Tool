import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './project.model';
import {HttpParams} from '@angular/common/http';
import {NfaCatalogModel} from './nfaCatalog.model';



@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}

  postNfa(metricId: number, nfa: NfaCatalogModel) {
    console.log(nfa);
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/' ,{ metricId, nfa });
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
