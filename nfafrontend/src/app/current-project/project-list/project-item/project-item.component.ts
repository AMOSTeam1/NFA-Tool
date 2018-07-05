import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../shared/project.model';
import {CurrentProjectService} from "../../current-project.service";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit{

  // @Input() index: number;
  @Input() project: Project;
  @Input() id: number;

  constructor(
    private currentProjectService: CurrentProjectService
  ) {
    this.currentProjectService.setProject(this.project);
  }

  ngOnInit() {
    // this.project = this.currentProjectService.getProjectById(this.id);
    // this.id = this.project.id;

  }


}
