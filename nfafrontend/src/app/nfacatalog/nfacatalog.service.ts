
import {Subject} from "rxjs/Subject";
import {NfaCatalogModel} from "../shared/nfaCatalog.model";


export class NfacatalogService {
  private nfaCatalog: NfaCatalogModel[];
  nfaCatalogChanged = new Subject<NfaCatalogModel[]>();


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
}
