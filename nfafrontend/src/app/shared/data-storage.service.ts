import {Nfa} from './nfa.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './project.model';
import {Type} from './type.model';



@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}

  postNfa(nfa: Nfa) {
    console.log(nfa);
   return this.http.post('http://localhost:8080/nfabackend/webapi/nfa_catalog/' , nfa);
  }
  storeProject(newproject: Project, type: Type[]) {
    console.log(newproject);
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', newproject:type);
  }

  getCurrentProjects() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/project');
  }
  deleteProject(project: Project) {
    return this.http.delete('http://localhost:8080/nfabackend/webapi/project/' + project.id);
  }

  updateProject(updatedProject : Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/edit', updatedProject);
  }
  getAllTypes() {
    return this.http.get('http://localhost:8080/nfabackend/webapi/types');
  }
}
