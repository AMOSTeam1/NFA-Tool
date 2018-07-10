import {NfaMetricModel} from './nfaMetric.model';

export class NfaCriteriaModel{
  constructor(

    public id: number,
    public criteriaNumber: number,
    public criteria: string,
    public metricList: NfaMetricModel[]
  ) {}
}
