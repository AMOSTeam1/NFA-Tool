import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Response} from '@angular/http';
import {CurrentProjectService} from '../current-project.service';
import {ProjectType} from '../../shared/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

enum STATUS {
  ALL = 'All',
  ON_PROCESS = 'On Process',
  ARCHIVED = 'Archived',
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {

  status = STATUS.ALL;

  projects: Project[];
  subscription: Subscription;

  constructor(private currentProjectService: CurrentProjectService,
              private route: ActivatedRoute,
              private router: Router,
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
    this.subscription = this.currentProjectService.projectsChanged
      .subscribe(
        (projects: Project[]) => {
          this.projects = projects;
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

  onNewProject(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onAll() {

    if(STATUS.ALL != this.status){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
    }
    this.status = STATUS.ALL;

    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          this.currentProjectService.setProjects(projects);
          this.projects = projects;
        }
      );
  }
  onProcess() {

    if(STATUS.ON_PROCESS != this.status) {
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.status = STATUS.ON_PROCESS;
    }

    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          let projs : Project[] = [];
          projects.forEach((x) => { if ( x.projectStatus === STATUS.ON_PROCESS) { projs.push(x); }});
          this.currentProjectService.setProjects(projs);
        }
      );
  }
  onArchived() {
    if(STATUS.ARCHIVED != this.status){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.status = STATUS.ARCHIVED;
    }

    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          let projs : Project[] = [];
          projects.forEach((x) => { if ( x.projectStatus === STATUS.ARCHIVED) { projs.push(x); }});
          this.currentProjectService.setProjects(projs);
        }
    );
  }
}
