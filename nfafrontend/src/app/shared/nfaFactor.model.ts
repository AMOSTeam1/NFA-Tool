import {NfaCriteriaModel} from './nfaCriteria.model';

export class NfaFactorModel {
  constructor(
    public factorNumber: string,
    public factor: string,
    public criteriaList: NfaCriteriaModel[],
  ) {}
}
