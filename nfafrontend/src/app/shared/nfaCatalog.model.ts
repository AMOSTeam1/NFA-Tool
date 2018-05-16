export class NfaCatalogModel {
  constructor(
    public nfaCatalogId: string,
    public nfaCatalogType: string,
    public nfaCatalogBezeichnung: string,
    public rechtlicheVerbindlichkeit: string,
    public nfaCatalogWert: string,
    public nfaCatalogFormulierung : string,
    public nfaCatalogErklärung: string,
    public nfaCatalogReferenz: string,
    public nfaCatalogReferenzierteProjekte: string,
    public nfaCatalogKritikalität: string,
    public nfaCatalogDokument: string,
  ) {}
}
