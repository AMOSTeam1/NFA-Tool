import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Stakeholder} from '../../shared/stakeholder.model'
import {CurrentProjectService} from '../current-project.service';
import {Response} from '@angular/http';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  name: string;
  id: number;
  isSelected:boolean;
  selectedStakeHolders: Stakeholder[];
  selectedStake:number[];
  stackHolders: Stakeholder[];
  isExported = false;
  url:string;
  title: string;
  modal: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService,
              private  local: LocalStorageService,
              ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.project = this.currentProjectService.getProject(this.id);
          this.stackHolders = this.project.projectStakeholders.slice();
          this.selectedStakeHolders = this.stackHolders;
        }

      );
  }

  onEditProject() {
    this.local.clear();
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
  this.local.clear();
  this.currentProjectService.deleteProject(this.id);
    this.dataStorageService.deleteProject(this.project)
      .subscribe(
        (response) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
        }
      );
  }
  // Getting Selected stackholder
  getSelected() {
    this.selectedStakeHolders = [];
    this.stackHolders = this.stackHolders.filter(s => {
      if(s.stakeholder_id){
        this.selectedStakeHolders.push(s);
        this.selectedStake.push(s.stakeholder_id);
      }
      return s;
    });
  }
/* Modal actions : export will generate a link to download the xml zip files*/

  export() {
    this.dataStorageService.generateXml(this.project)
      .subscribe(
        (response) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
        }
      );
    this.isExported = true;
    this.url = "http://localhost:8080/nfabackend/webapi/order/download/"
    this.title = "Download XML File"
    this.isExported = true;
  }
  close(){
    this.isExported = false;
    this.url = null;
    this.title = null
  }


}
