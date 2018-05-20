
import {Subject} from "rxjs/Subject";
import {NfaCatalogModel} from "../shared/nfaCatalog.model";
import {NfaFactorModel} from "../shared/nfaFactor.model";


export class NfacatalogService {
  private nfaCatalog: NfaCatalogModel[];
  nfaCatalogChanged = new Subject<NfaCatalogModel[]>();

  private nfaFactors: NfaFactorModel[];
  nfaFactorChanged = new Subject<NfaFactorModel[]>();


  getnfaCatalogs() {
    return this.nfaCatalog.slice();
  }

  getnfaCatalog(index: number) {
    return this.nfaCatalog[index];
  }


  setnfaCatalogs(nfaCatalogs: NfaCatalogModel[]){
    this.nfaCatalog = nfaCatalogs;
    this.nfaCatalogChanged.next(this.nfaCatalog.slice());
  }

  setNfaFactors(nfaFactors: NfaFactorModel[]){
    this.nfaFactors = nfaFactors;
    this.nfaFactorChanged.next(this.nfaFactors.slice());
  }

  getNfaFactors() {
    return this.nfaFactors.slice();
  }

  getNfaFactor(index: number) {
    return this.nfaFactors[index];
  }
}
