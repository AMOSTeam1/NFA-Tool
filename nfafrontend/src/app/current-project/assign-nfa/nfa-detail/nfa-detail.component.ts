import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-nfa-detail',
  templateUrl: './nfa-detail.component.html',
  styleUrls: ['./nfa-detail.component.css']
})
export class NfaDetailComponent implements OnInit {
  nfa: NfaCatalogModel;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private currentProjectService: CurrentProjectService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['nfa_id'];
          this.nfa = this.currentProjectService.getNfa(this.id);
        }
      );
  }

}
