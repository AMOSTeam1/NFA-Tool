import { Component, OnInit } from '@angular/core';
import {ServerServices} from './server.services';
import {Project} from './project.model';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  projectSaveStatus = '';
  clientName = '';
  constructor(private serverService: ServerServices) {}
  ngOnInit() {
  }

  onClick() {
    this.projectSaveStatus = 'Project was created for ' + this.clientName ;
    const project = new Project(this.clientName)
    this.serverService.storeProject(project).subscribe((response) => console.log(response.json())) ;
  }
  onUpdateClientName(event: Event) {
    this.clientName = (<HTMLInputElement>event.target).value;
  }
}
