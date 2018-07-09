import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class DenfaformComponent implements OnInit, OnDestroy {
  deForm: FormGroup;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  modalVerbDe: Array<string> = ['muss', 'müssen', 'soll', 'sollen', 'kann', 'können'];
  qualExpr: Array<QualifiyingExpression> = QualifiyingExpression.listContent();
  constructor(private data: DataexchangeService) { }

  ngOnInit() {
    this.deForm = new FormGroup({
      'chbox': new FormControl(false),
      'nameNFA': new FormControl(null, Validators.required),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl({value: null, disabled: true}, Validators.required),
      'qualifyingEx': new FormControl(null, Validators.required),
      'valueInput': new FormArray([new FormControl({value: null, disabled: true}, Validators.required)]),
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
    } else if ((!isNull(qe.abundant) && fa.length === 1) && (this.deForm.get('chbox').value)) {
      fa.push(new FormControl(null, Validators.required));
    } else if ((!isNull(qe.abundant) && fa.length === 1) && (!this.deForm.get('chbox').value)) {
      fa.push(new FormControl({value: null, disabled: true}, Validators.required));
    }
  }

  ngOnDestroy() {
    this.data.changeMessage(new Inst(null, null, null));
  }

  resetForm() {
    if ((<FormArray>this.deForm.get('valueInput')).length === 2) {
      (<FormArray>this.deForm.get('valueInput')).removeAt(1);
    }
    this.deForm.reset();
    this.deForm.get('modalVerb').disable({});
    this.deForm.get('valueInput').disable({});
  }

}

