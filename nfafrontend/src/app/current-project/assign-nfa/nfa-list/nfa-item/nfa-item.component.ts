import {Component, Input, OnInit} from '@angular/core';
import {NfaCatalogModel} from '../../../../shared/nfaCatalog.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nfa-item',
  templateUrl: './nfa-item.component.html',
  styleUrls: ['./nfa-item.component.css']
})
export class NfaItemComponent implements OnInit {

  @Input() nfaCatalog: NfaCatalogModel;
  @Input() index: number;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
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
