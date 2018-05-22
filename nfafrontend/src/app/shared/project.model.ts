import {ProjectType} from './type.model';

export class Project {

  constructor(
    public id: number,
    public customerName: string,
    public contactPersCustomer: string,
    public contactPersMsg: string,
    public branch: string,
    public projectTypes: ProjectType[],
    public developmentProcess: string,
    public projectPhase: string,
    public projectStatus: string,
    public stakeholder_name: string,
  ) {}
}
