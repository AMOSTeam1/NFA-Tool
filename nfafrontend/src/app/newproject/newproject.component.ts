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
  kundenName = '';
  constructor(private dataStorage: DataStorageService) {}
  ngOnInit() {
  }

  onClick() {
    this.projectSaveStatus = 'Project was created for ' + this.kundenName ;
    const project = new Project(this.kundenName)
    this.dataStorage.storeProject(project).subscribe((response) => console.log(response.json())) ;
  }
  onUpdateClientName(event: Event) {
    this.kundenName = (<HTMLInputElement>event.target).value;
  }
}
