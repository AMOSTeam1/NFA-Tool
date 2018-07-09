import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import {isNull, isNumber} from 'util';
import {QualifiyingExpression} from '../../../shared/blueprints/QualifiyingExpression.model';
import {ISubscription} from 'rxjs/Subscription';
import {Inst} from '../../../shared/blueprints/inst.model';

@Component({
  selector: 'app-ennfaform',
  templateUrl: './ennfaform.component.html',
  styleUrls: ['./ennfaform.component.css']
})
export class EnnfaformComponent implements OnInit, OnDestroy {
  checked = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  enForm: FormGroup;
  subscription: ISubscription;

  constructor(private data: DataexchangeService) {}

  ngOnInit() {
    this.enForm = new FormGroup({
      'nameNFA': new FormControl(null, Validators.required),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl(null),
      'qualifyingEx': new FormControl(null, Validators.required),
      'valueInput':  new FormArray([new FormControl(null)]),
      'verb': new FormControl('be')
    });
    this.subscription = this.data.currentMessage.subscribe(message => {
      if ((message.verb === 'müssen') || (message.verb === 'muss')) {
        this.enForm.get('modalVerb').reset('shall');
      }
      if ((message.verb === 'sollen') || (message.verb === 'soll')) {
        this.enForm.get('modalVerb').reset('should');
      }
      if ((message.verb === 'können') || (message.verb === 'kann')) {
        this.enForm.get('modalVerb').reset('can');
      }
      if (message.verb === null) {
        this.enForm.get('modalVerb').reset(null);
      }
      if (!isNull(message.wert)) {
        (<FormArray>this.enForm.get('valueInput')).setControl(0, new FormControl(message.wert[0]));
      }
      this.enForm.get('qualifyingEx').reset(
        message.qualifExp ? (message.qualifExp.en + (message.qualifExp.abundant ? (' / ' + message.qualifExp.abundant.en) : '')) : '');

      const fa = (<FormArray>this.enForm.get('valueInput'));

      if ((!isNull(message.qualifExp)) && (!isNull(message.qualifExp.abundant)) && fa.length === 1) {
        fa.push(new FormControl(null));
      } else if ((!isNull(message.qualifExp)) && (!isNull(message.qualifExp.abundant)) && fa.length === 2) {
        console.log(message.wert[1]);
        fa.setControl(1, new FormControl(message.wert[1]));
      } else if ((!isNull(message.qualifExp)) && (isNull(message.qualifExp.abundant)) && (fa.length === 2)) {
        fa.removeAt(1);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetForm() {
    if ((<FormArray>this.enForm.get('valueInput')).length === 2) {
      (<FormArray>this.enForm.get('valueInput')).removeAt(1);
    }
    this.enForm.reset();
    this.enForm.get('verb').reset('be');
  }
}
