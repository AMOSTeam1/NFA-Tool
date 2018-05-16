import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Response} from '@angular/http';
import {CurrentProjectService} from '../current-project.service';
import {ProjectType} from '../../shared/type.model';

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
    this.dataStorageService.getTypes()
      .subscribe(
        (response: Response) => {
          const types: ProjectType[] = response.json();
          this.currentProjectService.setTypes(types);
        }
      );
  }

  onSearch(frominput: HTMLInputElement) {
    this.dataStorageService.getProjectByName(frominput.value).subscribe(
      (response: Response) => {
        const projects: Project[] = response.json();
        this.currentProjectService.setProjects(projects);
        this.projects = projects;
      }
    );
  }
}
