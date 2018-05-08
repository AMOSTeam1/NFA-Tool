import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../shared/project.model';
import { CurrentProjectService } from '../current-project.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: Project;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params) => {
          this.id = +params['id'];
          this.project = this.copy(
            this.currentProjectService.getProject(this.id));
        });
   }

  private copy(toEdit: Project) {
    return new Project(toEdit.id,
    toEdit.customerName,
    toEdit.contactPersCustomer,
    toEdit.contactPersMsg,
    toEdit.branch,
    toEdit.projectType,
    toEdit.developmentProcess,
    toEdit.projectPhase,
    toEdit.projectStatus);
  }

  onUpdateProject() {
      this.dataStorage.updateProject(this.project).subscribe((response) => {
      this.currentProjectService.updateProject(this.id, this.project);
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
