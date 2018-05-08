import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {CurrentProjectService} from '../current-project.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.project = this.currentProjectService.getProject(this.id);
        }
      );
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.currentProjectService.deleteProject(this.id);
    this.dataStorageService.deleteProject(this.project)
      .subscribe(
        (response: Response) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.currentProjectService.projectsChanged.next(this.currentProjectService.getProjects());
        }
      );
  }

}
