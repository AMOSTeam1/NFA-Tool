import {forEach} from '@angular/router/src/utils/collection';

export class QualifiyingExpression {
  private constructor(
    public de: string,
    public en: string,
    public abundant: QualifiyingExpression) { }

    public static listContent(): Array<QualifiyingExpression> {
      return [
        new QualifiyingExpression('von', 'from', new QualifiyingExpression('bis', 'to', null)),
        new QualifiyingExpression('zwischen', 'between', new QualifiyingExpression('und', 'and', null))
      ];
    }

  public static resolve(de: string): QualifiyingExpression {
     return this.listContent().find(value => value.de === de);
  }
}
