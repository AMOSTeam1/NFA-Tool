import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';

import {CurrentProjectService} from '../current-project.service';
import {ProjectType} from '../../shared/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {TranslateService} from "@ngx-translate/core";
import { LocalStorageService } from 'angular-web-storage';

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

export class ProjectListComponent implements OnInit , OnDestroy{

  projects: Project[];
  private subscription: ISubscription[];

  constructor(private currentProjectService: CurrentProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private translateService: TranslateService,
              private  local: LocalStorageService) {
    this.subscription = [];
    this.currentProjectService.setStatus(STATUS.ON_PROCESS);
  }


  ngOnInit() {
    let subscription = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),"")
      .subscribe(
        response => {
          const projects: Project[] = response;
          this.currentProjectService.setProjects(projects);
          this.projects = projects;
        },
        error1 => console.log(error1)
      );
    this.subscription.push(subscription);

    subscription = this.dataStorageService.getTypes()
      .subscribe(
        response => {
          this.currentProjectService.setTypes(response);
        },
        error1 => console.log(error1)
      );
    this.subscription.push(subscription);

    subscription = this.currentProjectService.projectsChanged
      .subscribe(
        (projects: Project[]) => {
          this.projects = projects;
        },
        error1 => console.log(error1)
      );
    this.subscription.push(subscription);

  }

  ngOnDestroy(){
    for(let item of this.subscription){
      item.unsubscribe();
    }
  }


  onSearch(frominput: HTMLInputElement) {

    const subscription = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),frominput.value).subscribe(
      response=> {
        this.projects = response;
        this.currentProjectService.setProjects(this.projects);
      },
      error1 => console.log(error1)
    );

    this.subscription.push(subscription);
  }

  onNewProject(){
    this.local.clear();
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onAll(frominput: HTMLInputElement) {

    if(STATUS.ALL != this.currentProjectService.getStatus()){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
    }
    this.currentProjectService.setStatus( STATUS.ALL);

    const subscription = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),frominput.value)
      .subscribe(
        response => {
          this.projects = response;
          this.currentProjectService.setProjects(this.projects);

        },
        error1 => console.log(error1)
      );

    this.subscription.push(subscription);
  }

  onProcess(frominput: HTMLInputElement) {
    if(STATUS.ON_PROCESS != this.currentProjectService.getStatus()) {
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.currentProjectService.setStatus( STATUS.ON_PROCESS);
    }

    const subscription = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),frominput.value)
      .subscribe(
        response => {
          this.projects = response;
          this.currentProjectService.setProjects(this.projects);
        },
        error1 => console.log(error1)
      );

    this.subscription.push(subscription);
  }
  onArchived(frominput: HTMLInputElement) {
    if(STATUS.ARCHIVED != this.currentProjectService.getStatus()){
      this.router.navigate([this.route.snapshot.routeConfig.path]);
      this.currentProjectService.setStatus( STATUS.ARCHIVED);
    }

    const subscription = this.dataStorageService.getProjectsByName(this.currentProjectService.getStatus(),frominput.value)
      .subscribe(
       response => {
         this.projects = response;
          this.currentProjectService.setProjects(this.projects);
        },
        error1 => console.log(error1)
    );

    this.subscription.push(subscription);
  }

  getStringByStatus() : string {
    let status : string = this.currentProjectService.getStatus();
    let retVal :string = '';
    switch (status){
      case STATUS.ON_PROCESS:
        this.translateService.get('nfa.project-details.project-status.on-process')
          .subscribe(value => retVal = value);
        break;
      case STATUS.ARCHIVED:
        this.translateService.get('nfa.project-details.project-status.archived')
          .subscribe(value => retVal = value);
        break;
      case STATUS.ALL:
        this.translateService.get('nfa.search-project.filter-all')
          .subscribe(value => retVal = value);
        break;
    }

    return retVal;
  }


}
