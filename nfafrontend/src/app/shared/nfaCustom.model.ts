import {NfaCatalogBlueprintModel} from "./nfaCatalogBlueprint.model";

export class NfaCustomModel {
  constructor(
    public nfaCustomId: number,
    public nfaOriginalId: number,
    public value: string,
    public formulation: string,
    public blueprint: NfaCatalogBlueprintModel,
    public reference: string,
    public criticality: string,
    public document: string
  ) {}
}
