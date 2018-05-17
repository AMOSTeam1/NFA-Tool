import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Project} from '../../shared/project.model';
import {Response} from '@angular/http';
import {CurrentProjectService} from '../current-project.service';
import {ProjectType} from '../../shared/type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  status = 'All';
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
  onAll() {this.status = 'All';
    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          this.currentProjectService.setProjects(projects);
          this.projects = projects;
        }
      ); }
  onProcess() {
    this.status = 'On Process';
    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          let projs : Project[] = [];
          projects.forEach((x) => { if ( x.projectStatus === 'On Process') { projs.push(x); }})
          this.currentProjectService.setProjects(projs);
        }
      );
  }
  onArchived() {
    this.status = 'Archived';
    this.dataStorageService.getCurrentProjects()
      .subscribe(
        (response: Response) => {
          const projects: Project[] = response.json();
          let projs : Project[] = [];
          projects.forEach((x) => { if ( x.projectStatus === 'Archived') { projs.push(x); }})
          this.currentProjectService.setProjects(projs);
        }
      );}
}
