import {NfaCatalogModel} from './nfaCatalog.model';

export class NfaMetric{
  constructor(

    public id: number,
    public metricNumber: number,
    public bezeichnung: string,
    public erklaerungMessgroesse: string,
    public formel: string,
    public interpretation: string,
    public nfaList: NfaCatalogModel[]
  ) {}
}
