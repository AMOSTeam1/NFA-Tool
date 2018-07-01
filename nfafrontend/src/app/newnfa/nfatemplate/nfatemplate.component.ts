import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DenfaformComponent} from './denfaform/denfaform.component';
import {EnnfaformComponent} from './ennfaform/ennfaform.component';
import {QualifiyingExpression} from '../../shared/blueprints/QualifiyingExpression.model';
import {isNull} from 'util';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {NewnfaComponent} from '../newnfa.component';
import {ISubscription} from 'rxjs/src/Subscription';
import {PartialObserver} from 'rxjs/src/Observer';

@Component({
  selector: 'app-nfatemplate',
  templateUrl: './nfatemplate.component.html',
  styleUrls: ['./nfatemplate.component.css']
})
export class NfatemplateComponent implements OnInit, AfterViewInit {

  blueprintDeForm: FormGroup;
  blueprintEnForm: FormGroup;
  checked = false;
  submitted = false;
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  @ViewChild (DenfaformComponent) deComponent;
  @ViewChild (EnnfaformComponent) enComponent;
  @Output() submitTemplate = new EventEmitter<FormGroup>();
  @Input() validUpdate: ((value: boolean) => void);

 constructor() {

 }

 ngAfterViewInit() {

   const subscription = (value: any) =>
     this.validUpdate((this.deComponent.deForm.status === 'VALID')
      && (this.enComponent.enForm.status === 'VALID'));

   this.deComponent.deForm.statusChanges.subscribe(subscription);
   this.enComponent.enForm.statusChanges.subscribe(subscription);

 }
  ngOnInit() {

  }

  Reset() {
   this.checked = false;
   this.deComponent.resetForm();
   this.enComponent.resetForm();
  }

  hasValue(control: FormControl) {
    return !isNull(control.value);
  }

  hasAbundant() {
     return (!isNull(QualifiyingExpression.resolve(this.deComponent.deForm.get('qualifyingEx').value).abundant));
  }

  getValue(index: number) {
   return (<FormArray>this.deComponent.deForm.get('valueInput')).at(index).value;
  }

  fullQualExprDe() {
    return QualifiyingExpression.resolve(this.deComponent.deForm.get('qualifyingEx').value).fullDe();
  }

  fullQualExprEn() {
    return QualifiyingExpression.resolve(this.deComponent.deForm.get('qualifyingEx').value).fullEn();
  }
}
