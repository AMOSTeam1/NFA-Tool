import {isNull} from 'util';

export class QualifiyingExpression {
  private constructor(
    public de: string,
    public en: string,
    public abundant: QualifiyingExpression)
  { }

    public static listContent(): Array<QualifiyingExpression> {

      return [
        new QualifiyingExpression('gleich', 'equals', null ),
        new QualifiyingExpression('genau', 'exactly', null ),
        new QualifiyingExpression('größer als', 'greater than', null ),
        new QualifiyingExpression('mehr als', 'more than', null ),
        new QualifiyingExpression('besser als', 'better than', null ),
        new QualifiyingExpression('mindestens', 'at least', null ),
        new QualifiyingExpression('ungleich', 'unequal', null ),
        new QualifiyingExpression('kleiner als', 'less than', null ),
        new QualifiyingExpression('weniger als', 'under', null ),
        new QualifiyingExpression('schlechter als', 'worse than', null ),
        new QualifiyingExpression('höchstens', 'at most', null ),
        new QualifiyingExpression('bis zu', 'up to', null ),
        new QualifiyingExpression('von', 'from', new QualifiyingExpression('bis', 'to', null)),
        new QualifiyingExpression('zwischen', 'between', new QualifiyingExpression('und', 'and', null))
      ];
    }

  public static resolve(de: string): QualifiyingExpression {
     return de === null ? null : this.listContent().find(value => value.de === de);
  }

  public fullDe() {
    return isNull(this.abundant) ? [this.de] : [this.de, this.abundant.de];
  }

  public fullEn() {
    return isNull(this.abundant) ? [this.en] : [this.en, this.abundant.en];
  }
}
