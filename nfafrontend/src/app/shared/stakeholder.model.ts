import {NfaFactorModel} from './nfaFactor.model';

export class Stakeholder {
  constructor(
    public stakeholder_id: number,
    public stakeholder_name: string,
    public stakeholderFactors: string[]
    //public stakeholderFactors: NfaFactorModel[]
  ) {}
}
