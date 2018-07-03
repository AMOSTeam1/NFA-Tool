import {NfaCatalogBlueprintModel} from './nfaCatalogBlueprint.model';

export class NfaCatalogModel {
  constructor(
    public id: number,
    public nfaNumber: number,
    public type: string,
    public rechtlicheVerbindlichkeit: string,
    public value: string[],
    public formulation: string,
    public blueprint: NfaCatalogBlueprintModel,
    public reference: string,
    public referencedProjects: string,
    public criticality: string,
    public document: string,
  ) {}
}
