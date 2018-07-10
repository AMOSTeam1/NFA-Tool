import {NfaCatalogBlueprintModel} from "./nfaCatalogBlueprint.model";

export interface NfaInterfaceModel {
  values: string[],
  formulation: string,
  blueprint: NfaCatalogBlueprintModel,
  reference: string,
  criticality: string,
  document: string,
}
