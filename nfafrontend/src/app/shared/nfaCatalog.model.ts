import {NfaCatalogBlueprintModel} from './nfaCatalogBlueprint.model';

export class NfaCatalogModel {
  constructor(
    public nfaCatalogId: number,
    public nfaNumber: number,
    public nfaCatalogType: string,
    public rechtlicheVerbindlichkeit: string,
    public nfaCatalogWert: string,
    public nfaCatalogFormulierung: string,
    public nfaCatalogBlueprint: NfaCatalogBlueprintModel,
    public nfaCatalogReferenz: string,
    public nfaCatalogReferenzierteProjekte: string,
    public nfaCatalogKritikalität: string,
    public nfaCatalogDokument: string,
  ) {}
}
