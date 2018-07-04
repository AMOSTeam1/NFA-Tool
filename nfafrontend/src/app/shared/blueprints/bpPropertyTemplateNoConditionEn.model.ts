import {IBlueprint} from './IBlueprint.model';

export class BpPropertyTemplateNoConditionEn implements IBlueprint {

  constructor(
    public bezeichnung: string,
    public erklaerung: string,
    public characteristic: string,
    public property: string,
    public modalVerb: string,
    public qualifyingEx: string[],
    public verb: string

  ) {}
}
