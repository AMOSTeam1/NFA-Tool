import {NfaCatalogBlueprintModel} from "./nfaCatalogBlueprint.model";
import {NfaInterfaceModel} from "./nfaInterface.model";

export class NfaCustomModel implements NfaInterfaceModel{
  constructor(
    public nfaCustomId: number,
    public nfaOriginalId: number,
    public value: string[],
    public formulation: string,
    public blueprint: NfaCatalogBlueprintModel,
    public reference: string,
    public criticality: string,
    public document: string
  ) {}
}
