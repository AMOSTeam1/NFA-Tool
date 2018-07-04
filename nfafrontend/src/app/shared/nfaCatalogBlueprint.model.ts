import {IBlueprint} from './blueprints/IBlueprint.model';
import {TranslateService} from "@ngx-translate/core";

export class NfaCatalogBlueprintModel implements IBlueprint{
  constructor(
    public de: IBlueprint,
    public en: IBlueprint,
    private translateService: TranslateService
  ) {}

  public getBezeichnung(lang?: string) : string
  {
    //if given language is german or no language is given and current language is german
    if(lang === 'de' || (!lang && this.translateService.currentLang === 'de')){
      return this.de.getBezeichnung();
    }

    //otherwise use english
    return this.en.getBezeichnung();
  }

  public getErklaerung(lang?: string) : string
  {
    //if given language is german or no language is given and current language is german
    if(lang === 'de' || (!lang && this.translateService.currentLang === 'de')){
      return this.de.getErklaerung();
    }

    //otherwise use english
    return this.en.getErklaerung();
  }
}
