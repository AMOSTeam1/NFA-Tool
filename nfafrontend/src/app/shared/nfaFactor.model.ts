import {NfaCriteriaModel} from './nfaCriteria.model';

export class NfaFactorModel {
  constructor(
    public nfa_id: string,
    public factor: string,
    public criteriaList: NfaCriteriaModel[],
  ) {}
}
