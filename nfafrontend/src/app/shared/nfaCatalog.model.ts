export class NfaCatalogModel {
  constructor(
    public nfaCatalogId: number,
    public nfaNumber: number,
    public nfaCatalogType: string,
    public nfaCatalogBezeichnung: string,
    public rechtlicheVerbindlichkeit: string,
    public nfaCatalogWert: string,
    public nfaCatalogFormulierung : string,
    public nfaCatalogErklaerung: string,
    public nfaCatalogReferenz: string,
    public nfaCatalogReferenzierteProjekte: string,
    public nfaCatalogKritikalität: string,
    public nfaCatalogDokument: string,
  ) {}
}
