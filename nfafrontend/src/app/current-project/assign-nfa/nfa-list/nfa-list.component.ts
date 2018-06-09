import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {Project} from '../../../shared/project.model';

@Component({
  selector: 'app-nfa-list',
  templateUrl: './nfa-list.component.html',
  styleUrls: ['./nfa-list.component.css']
})
export class NfaListComponent implements OnInit {

  nfaCatalogs : NfaCatalogModel[];
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
          this.currentProjectService.setProject(this.id);
          this.nfaCatalogs = this.currentProjectService.getProject(this.id).projectNfas;
        }
      );
  }

  AssignNfa(){
    this.router.navigate(['choose'], {relativeTo: this.route});
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
  }

}
