import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './project.model';

@Injectable()
export class ServerServices {
  constructor(private  http: Http) {}
  storeProject(newproject: Project) {
    return this.http.post('http://localhost:8080/nfabackend/webapi/project/create', newproject);
  }
}

