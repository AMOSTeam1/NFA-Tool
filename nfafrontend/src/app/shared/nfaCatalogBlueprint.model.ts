import {IBlueprint} from './blueprints/IBlueprint.model';

export class NfaCatalogBlueprintModel {
  constructor(
    public de: IBlueprint,
    public en: IBlueprint
  ) {}
}
