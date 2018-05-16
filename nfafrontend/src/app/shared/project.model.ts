export class Project {

  constructor(
    public id: string,
    public archived: boolean,
    public customerName: string,
    public contactPersCustomer: string,
    public contactPersMsg: string,
    public branch: string,
    public projectType: string,
    public developmentProcess: string,
    public projectPhase: string,
    public projectStatus: string,
  ) {}
}
