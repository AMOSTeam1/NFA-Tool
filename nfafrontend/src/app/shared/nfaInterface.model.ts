import {NfaCatalogBlueprintModel} from "./nfaCatalogBlueprint.model";

export interface NfaInterfaceModel {
  value: string[],
  formulation: string,
  blueprint: NfaCatalogBlueprintModel,
  reference: string,
  criticality: string,
  document: string,
}
