
import {Nfa} from "../shared/nfa.model";


export class NfacatalogService {
  private nfaCatalog: Nfa[];


  getnfaCatalogs() {
    return this.nfaCatalog.slice();
  }

  getnfaCatalog(index: number) {
    return this.nfaCatalog[index];
  }


}
