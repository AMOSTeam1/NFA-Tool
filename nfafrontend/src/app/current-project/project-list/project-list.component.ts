import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Response} from '@angular/http';
import {CurrentProjectService} from '../current-project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  constructor(private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService) { }


  ngOnInit() {
    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
                   const projects: Project[] = response.json();
                    this.currentProjectService.setProjects(projects);
                 this.projects = projects;
                 }
      );
  }

  onSearch(frominput: HTMLInputElement) {
    console.log(frominput.value);
  }
}
