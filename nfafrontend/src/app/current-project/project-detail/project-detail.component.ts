import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Stakeholder} from '../../shared/stakeholder.model'
import {CurrentProjectService} from '../current-project.service';
import {LocalStorageService} from 'angular-web-storage';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  displayed_project: Project;
  name: string;
  project_id_param: number;
  isSelected:boolean;
  selectedStakeHolders: Stakeholder[];
  selectedStake:number[];
  stackHolders: Stakeholder[];
  isExported = false;
  url: string;
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
          this.project_id_param = +params['project_id'];

          this.displayed_project = this.currentProjectService.getProjectById(this.project_id_param);

          this.stackHolders = this.displayed_project.projectStakeholders.slice();
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
    this.currentProjectService.deleteProjectById(this.project_id_param);
    this.dataStorageService.deleteProject(this.displayed_project)
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

    this.dataStorageService.generateXml(this.displayed_project)
      .subscribe(
        (response) => {
        }
      );
    this.isExported = true;
  }
}
