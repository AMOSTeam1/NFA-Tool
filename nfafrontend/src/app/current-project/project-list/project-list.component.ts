import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Response} from '@angular/http';
import {CurrentProjectService} from '../current-project.service';
import {ProjectType} from '../../shared/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from "@ngx-translate/core";
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

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

  status = STATUS.ON_PROCESS;
  projects: Project[];
  subscription: Subscription;

  constructor(private currentProjectService: CurrentProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private tranlateService: TranslateService,
              private  local: LocalStorageService) { }


  ngOnInit() {
    this.dataStorageService.getProjectByName(this.status,"")
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

    this.dataStorageService.getProjectByName(this.status,frominput.value).subscribe(
      (response: Response) => {
        const projects: Project[] = response.json();
        this.projects = projects;
        this.currentProjectService.setProjects(this.projects);

      }
    );
  }

  onNewProject(){
    this.local.clear();
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onAll(frominput: HTMLInputElement) {

    if(STATUS.ALL != this.status){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
    }
    this.status = STATUS.ALL;

    this.dataStorageService.getProjectByName(this.status,frominput.value)
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          this.projects = projects;
          this.currentProjectService.setProjects(this.projects)

        }
      );
  }

  onProcess(frominput: HTMLInputElement) {
    if(STATUS.ON_PROCESS != this.status) {
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.status = STATUS.ON_PROCESS;
    }

    this.dataStorageService.getProjectByName(this.status,frominput.value)
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          this.projects = projects;
          this.currentProjectService.setProjects(this.projects);
        }
      );
  }
  onArchived(frominput: HTMLInputElement) {
    if(STATUS.ARCHIVED != this.status){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.status = STATUS.ARCHIVED;
    }

    this.dataStorageService.getProjectByName(this.status,frominput.value)
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          this.projects = projects;
          this.currentProjectService.setProjects(this.projects);
        }
    );
  }

  getStringByStatus(status : STATUS) : string{

    let retVal :string = '';
    switch (status){
      case STATUS.ON_PROCESS:
        this.tranlateService.get('nfa.project-details.project-status.on-process')
          .subscribe(value => retVal = value);
        break;
      case STATUS.ARCHIVED:
        this.tranlateService.get('nfa.project-details.project-status.archived')
          .subscribe(value => retVal = value);
        break;
      case STATUS.ALL:
        this.tranlateService.get('nfa.search-project.filter-all')
          .subscribe(value => retVal = value);
        break;
    }

    return retVal;
  }
}
