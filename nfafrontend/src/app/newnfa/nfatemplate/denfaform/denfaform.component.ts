import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';
import {Inst} from '../../../shared/blueprints/inst.model';
import {ifTrue} from 'codelyzer/util/function';
import {QualifiyingExpression} from '../../../shared/blueprints/QualifiyingExpression.model';
import {NfatemplateComponent} from '../nfatemplate.component';
import {isNull} from 'util';

@Component({
  selector: 'app-denfaform',
  templateUrl: './denfaform.component.html',
  styleUrls: ['./denfaform.component.css']
})
export class DenfaformComponent implements OnInit {
  deForm: FormGroup;
  @Input() send = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  qualExpr: Array<QualifiyingExpression> = QualifiyingExpression.listContent();
  constructor(private data: DataexchangeService) { }

  ngOnInit() {
    this.deForm = new FormGroup({
      'chbox': new FormControl(false),
      'nameNFA': new FormControl(null),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl({value: null, disabled: true}),
      'qualifyingEx': new FormControl(null, Validators.required),
      'valueInput': new FormArray([new FormControl({value: null, disabled: true})]),
      'verb': new FormControl(null, Validators.required)
    });
  }
  isChecked(event: any) {
     if (event.currentTarget.checked === true) {
      this.deForm.get('modalVerb').enable({});
      this.deForm.get('valueInput').enable({});
    } else {
       this.deForm.get('modalVerb').reset();
       this.deForm.get('valueInput').reset();
       this.newMessage(event);
       this.deForm.get('modalVerb').disable({});
      this.deForm.get('valueInput').disable({});
    }
  }

  newMessage(event: any) {

    const qe = QualifiyingExpression.resolve(this.deForm.get('qualifyingEx').value);

    if (this.deForm.get('chbox')) {
      this.data.changeMessage(new Inst(
        this.deForm.get('valueInput').value,
        this.deForm.get('modalVerb').value,
        qe)
      );
    }
    const fa = (<FormArray> this.deForm.get('valueInput'));

    if (isNull(qe.abundant) && fa.length === 2) {
      fa.removeAt(1);
    } else if (!isNull(qe.abundant) && fa.length === 1) {
      fa.push(new FormControl({value: null, disabled: true}));
    }
  }

  resetForm() {
    this.deForm.reset();
    this.deForm.get('modalVerb').disable({});
    this.deForm.get('valueInput').disable({});
  }

  getQualifiyingExpression() {
    return this.getQE(this.deForm.get('qualifyingEx').value);
  }

  private getQE(value: string) {
    return QualifiyingExpression.resolve(value);
  }
}

