import {Injectable} from '@angular/core';
import {Project} from './project.model';
import {NfaCatalogModel} from './nfaCatalog.model';
import {NfaCustomModel} from "./nfaCustom.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NfaFactorModel} from "./nfaFactor.model";
import {ProjectType} from "./type.model";

const headersJson = new HttpHeaders(
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  }
);
const headersXml = new HttpHeaders(
  {
    'Content-Type': 'application/xml',
    'Accept': 'application/xml, text/plain, */*'
  }
);
const httpOptionsJson = {
  headers: headersJson
};
const httpOptionsXml = {
  headers: headersXml
};

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient) {}

  storeNfa(metricId: number, nfa: NfaCatalogModel) : Observable<any> {
   return this.http.post<any>('http://localhost:8080/nfabackend/webapi/nfa_catalog/create/' + metricId, nfa, httpOptionsJson);
  }

  storeProject(new_project: Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', new_project, httpOptionsJson);
  }

  getCurrentProjects() : Observable<Project[]>{
    return this.http.get<Project[]>('http://localhost:8080/nfabackend/webapi/project');
  }

  deleteProject(project: Project) {
    return this.http.delete('http://localhost:8080/nfabackend/webapi/project/' + project.id);
  }

  getNfa(nfa_id: number) : Observable<NfaCatalogModel>{
    return this.http.get<NfaCatalogModel>('http://localhost:8080/nfabackend/webapi/nfa_catalog/'+nfa_id);
  }

  getCustomNfa(custom_id: number) : Observable<NfaCustomModel>{
    return this.http.get<NfaCustomModel>('http://localhost:8080/nfabackend/webapi/nfa_edit/'+custom_id);
  }

  storeEditedNfa(project_id: number, original_id: number, nfaCustom: NfaCustomModel) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_edit/create/' + project_id + '/' + original_id, nfaCustom, httpOptionsJson);
  }

  getCustomNfaPerProject(project_id: number) : Observable<NfaCustomModel[]>{
    return this.http.get<NfaCustomModel[]>('http://localhost:8080/nfabackend/webapi/nfa_edit/'+project_id);
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

  getProjectById(projectId: number){
    return this.http.get('http://localhost:8080/nfabackend/webapi/project/' + projectId);
  }

  getTypes() : Observable<ProjectType[]>{
    return this.http.get<ProjectType[]>('http://localhost:8080/nfabackend/webapi/types');
  }
  generateXml(project: Project) {
    return this.http.get('http://localhost:8080/nfabackend/webapi/projectexport/xml/'+ project.id, httpOptionsXml);
  }
  downloadXml() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/projectexport/download', httpOptionsXml);
  }
}
