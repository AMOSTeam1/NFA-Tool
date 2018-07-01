
import {Subject} from "rxjs/Subject";
import {NfaCatalogModel} from "../shared/nfaCatalog.model";
import {NfaFactorModel} from "../shared/nfaFactor.model";
import {NfaCriteriaModel} from '../shared/nfaCriteria.model';
import {CurrentProjectService} from '../current-project/current-project.service';


export class NfacatalogService {
  private nfaCatalog: NfaCatalogModel[];
  nfaCatalogChanged = new Subject<NfaCatalogModel[]>();
  currentProhjectService  = new CurrentProjectService();
  projectMode: boolean;
  private projectNfs: NfaCatalogModel[];
  projectId: number;

  private nfaFactors: NfaFactorModel[];
  nfaFactorChanged = new Subject<NfaFactorModel[]>();

  private nfaCriterias: NfaCriteriaModel[];
  nfaCriteriaChanged = new Subject<NfaCriteriaModel[]>();

  getnfaCatalogs() {
    return this.nfaCatalog.slice();
  }

  getnfaCatalog(index: number) {
    return this.nfaCatalog[index];
  }

  getProjectMode() {
    return this.projectMode;
  }

  setProjectMode(projectMode: boolean) {
     this.projectMode = projectMode;
  }


  setnfaCatalogs(nfaCatalogs: NfaCatalogModel[]) {
    this.nfaCatalog = nfaCatalogs;
    this.nfaCatalogChanged.next(this.nfaCatalog.slice());
    console.log(this.nfaCatalog.slice());
  }

  setNfaFactors(nfaFactors: NfaFactorModel[]) {
    this.nfaFactors = nfaFactors;
    this.nfaFactorChanged.next(this.nfaFactors.slice());
  }

  getNfaFactors() {
    return this.nfaFactors.slice();
  }

  setNfaCriterias(nfaCriterias: NfaCriteriaModel[]) {
    this.nfaCriterias = nfaCriterias;
    this.nfaCriteriaChanged.next(this.nfaCriterias.slice());
  }

  getNfaCriterias() {
    return this.nfaCriterias.slice();
  }

  getNfaCriteria(index: number) {
    return this.nfaCriterias[index];
  }
  getNfaFactor(index: number) {
    return this.nfaFactors[index];
  }
}
