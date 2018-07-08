import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './project.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NfaCatalogModel} from './nfaCatalog.model';
import {Stakeholder} from './stakeholder.model';





@Injectable()
export class DataStorageService {
  constructor(private http: Http, private httpClient: HttpClient) {}

  storeNfa(metricId: number, nfa: NfaCatalogModel) {
    console.log(nfa);
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/create/' + metricId, nfa);
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
  generateXml(project: Project) {
    return this.http.get('http://localhost:8080/nfabackend/webapi/projectexport/xml/'+ project.id );
  }
  downloadXml() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/projectexport/download');
  }

  importNfa(nfaFile: File) {
    const formData: FormData = new FormData();
    formData.append('file', nfaFile, nfaFile.name);
    const observable = this.httpClient.post('http://localhost:8080/nfabackend/webapi/project/importnfa', formData);
    observable.subscribe(resp => {
      //console.log(resp);
    });
  }
}
