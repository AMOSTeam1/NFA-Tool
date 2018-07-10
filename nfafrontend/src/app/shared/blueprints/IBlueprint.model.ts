export interface IBlueprint {

  bezeichnung?: string;
  erklaerung?: string;

  getBezeichnung() : string;
  getErklaerung() : string;
}
