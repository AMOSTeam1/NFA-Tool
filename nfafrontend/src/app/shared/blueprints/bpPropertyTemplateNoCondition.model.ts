import {IBlueprint} from './IBlueprint.model';

export class BpPropertyTemplateNoCondition implements IBlueprint {

  constructor(
    public bezeichnung: string,
    public erklaerung: string,
    public characteristic: string,
    public property: string,
    public modalVerb: string,
    public qualifyingEx: string[],
    public verb: string

  ) {}

  getBezeichnung(): string {
    return ((this.bezeichnung) ? this.bezeichnung : '');
  }

  getErklaerung(): string {
    return ((this.erklaerung) ? this.erklaerung : '');
  }
}
