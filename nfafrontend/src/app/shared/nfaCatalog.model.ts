import {NfaCatalogBlueprintModel} from './nfaCatalogBlueprint.model';
import {NfaInterfaceModel} from "./nfaInterface.model";

export class NfaCatalogModel implements NfaInterfaceModel{
  constructor(
    public id: number,
    public nfaNumber: number,
    public type: string,
    public legalLiability: string,
    public values: string[],
    public formulation: string,
    public blueprint: NfaCatalogBlueprintModel,
    public reference: string,
    public referencedProjects: string,
    public criticality: string,
    public document: string,
  ) {}
}
