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
  messageField ='';
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.project = this.currentProjectService.getProject(this.id);
        }
        );
   }

  onUpdateProject(){
      this.dataStorage.updateProject(this.project).subscribe((response) => {
      console.log(response.json());
      this.messageField = 'Project with ID ' + this.project.id + ' updated';
      
    });
  }
}
