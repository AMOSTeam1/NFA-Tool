import { Component, OnInit } from '@angular/core';
import { DataStorageService} from '../shared/data-storage.service';
import {Project} from './project.model';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  projectSaveStatus = '';
  customerName = '';
  constructor(private dataStorage: DataStorageService) {}
  ngOnInit() {
  }

  onClick() {
    this.projectSaveStatus = 'Project was created for ' + this.customerName ;
    const project = new Project(this.customerName) ;
    this.dataStorage.storeProject(project).subscribe((response) => console.log(response.json())) ;
  }
  onUpdateClientName(event: Event) {
    this.customerName = (<HTMLInputElement>event.target).value;
  }
}
