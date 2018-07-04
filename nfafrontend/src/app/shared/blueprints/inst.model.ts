import {QualifiyingExpression} from './QualifiyingExpression.model';

export class Inst {
    constructor(
      public wert: number,
      public verb: string,
      public qualifExp: QualifiyingExpression) { }
  }

