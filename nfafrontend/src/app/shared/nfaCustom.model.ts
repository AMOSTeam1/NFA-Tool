import {NfaCatalogBlueprintModel} from "./nfaCatalogBlueprint.model";
import {NfaInterfaceModel} from "./nfaInterface.model";
import {NfaCatalogModel} from "./nfaCatalog.model";
import {Project} from "./project.model";

export class NfaCustomModel implements NfaInterfaceModel{
  constructor(
    public customId: number,
    public originalNfa: NfaCatalogModel,
    public project: Project,
    public values: string[],
    public formulation: string,
    public blueprint: NfaCatalogBlueprintModel,
    public reference: string,
    public criticality: string,
    public document: string
  ) {}
}
