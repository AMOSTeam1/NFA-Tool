import { Component, OnInit } from '@angular/core';
import {NfaCatalogModel} from '../../../shared/nfaCatalog.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CurrentProjectService} from '../../current-project.service';
import {DataStorageService} from '../../../shared/data-storage.service';
import {TranslateService} from '@ngx-translate/core';

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
              private dataStorageService: DataStorageService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['nfa_id'];
          this.nfa = this.currentProjectService.getNfa(this.id);
        }
      );
  }

  bezeichnung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.nfaCatalogBlueprint.de.bezeichnung;
    } else {
      return nfa.nfaCatalogBlueprint.en.bezeichnung;
    }
  }

  erklaerung(nfa: NfaCatalogModel) {

    if (this.lang() === 'de') {
      return nfa.nfaCatalogBlueprint.de.erklaerung;
    } else {
      return nfa.nfaCatalogBlueprint.en.erklaerung;
    }
  }

  private lang() {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = this.translateService.defaultLang;
    }
    return lang;
  }


}
