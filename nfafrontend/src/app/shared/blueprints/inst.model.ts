import {QualifiyingExpression} from './QualifiyingExpression.model';

//TODO WTF is that NAME supposed to be? How should I know, what that is???
export class Inst {
    constructor(
      public wert: number,
      public verb: string,
      public qualifExp: QualifiyingExpression) { }
  }

