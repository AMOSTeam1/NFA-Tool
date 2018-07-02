import {Injectable} from '@angular/core';
import {Project} from './project.model';
import {NfaCatalogModel} from './nfaCatalog.model';
import {NfaCustomModel} from "./nfaCustom.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NfaFactorModel} from "./nfaFactor.model";
import {ProjectType} from "./type.model";

const headers = new HttpHeaders(
  {
      'Content-Type': 'application/json'
    }
  );
const httpOptions = {
  headers: headers
};

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient) {}

  storeNfa(metricId: number, nfa: NfaCatalogModel) {
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/create/' + metricId, nfa);
  }
  storeEditedNfa(nfaCustom: NfaCustomModel) {
    // return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_edit/create', customNfa, httpOptions);
    return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_edit/create/' + nfaCustom.nfaOriginalId, nfaCustom);
  }

  storeProject(newproject: Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', newproject);
  }

  getCurrentProjects() : Observable<Project[]>{
    return this.http.get<Project[]>('http://localhost:8080/nfabackend/webapi/project');
  }
  deleteProject(project: Project) {
    return this.http.delete('http://localhost:8080/nfabackend/webapi/project/' + project.id);
  }
  getNfaCatalog() : Observable<NfaCatalogModel[]>{
    return this.http.get<NfaCatalogModel[]>('http://localhost:8080/nfabackend/webapi/nfa_catalog');
  }
  getNfaFactors() : Observable<NfaFactorModel[]> {
    return this.http.get<NfaFactorModel[]>('http://localhost:8080/nfabackend/webapi/nfa_factor');
  }

  updateProject(updatedProject: Project) : Observable<Project[]> {
    return this.http.post<Project[]>('http://localhost:8080/nfabackend/webapi/project/edit', updatedProject);
  }

  getProjectsByName(status: string, param: string ) : Observable<Project[]>{
   return this.http.get<Project[]>('http://localhost:8080/nfabackend/webapi/project/search?status=' + status +'&lookupCustName=' + param );
  }

  getTypes() : Observable<ProjectType[]>{
    return this.http.get<ProjectType[]>('http://localhost:8080/nfabackend/webapi/types');
  }

}
