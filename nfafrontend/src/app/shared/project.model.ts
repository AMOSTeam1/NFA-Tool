import {ProjectType} from './type.model';
import {Stakeholder} from './stakeholder.model';
import {NfaCatalogModel} from './nfaCatalog.model';

export class Project {

  constructor(
    public id: number,
    public customerName: string,
    public contactPersCustomer: string,
    public contactPersMsg: string,
    public branch: string,
    public projectTypes: ProjectType[],
    public projectStakeholders: Stakeholder[],
    public developmentProcess: string,
    public projectPhase: string,
    public projectStatus: string,
    public projectNfas: NfaCatalogModel[]
  ) {}
}
