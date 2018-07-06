import {IBlueprint} from "./IBlueprint.model";

export class Blueprint implements IBlueprint{

  bezeichnung?: string;
  erklaerung?: string;

  public getBezeichnung() : string
  {
    return ((this.bezeichnung) ? this.bezeichnung : '');
  }

  public getErklaerung() : string
  {
    return ((this.erklaerung) ? this.erklaerung : '');
  }
}
