import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DenfaformComponent} from './denfaform/denfaform.component';
import {EnnfaformComponent} from './ennfaform/ennfaform.component';
import {QualifiyingExpression} from '../../shared/blueprints/QualifiyingExpression.model';

@Component({
  selector: 'app-nfatemplate',
  templateUrl: './nfatemplate.component.html',
  styleUrls: ['./nfatemplate.component.css']
})
export class NfatemplateComponent implements OnInit, AfterViewInit {

  blueprintDeForm: FormGroup;
  blueprintEnForm: FormGroup;
  valid = false;
  checked = false;
  submitted = false;
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  @ViewChild (DenfaformComponent) deComponent;
  @ViewChild (EnnfaformComponent) enComponent;
  @Output() submitTemplate = new EventEmitter<FormGroup>();

  definition = {
    characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>'
  };

 constructor() {

 }

 ngAfterViewInit() {
   this.deComponent.deForm.statusChanges.subscribe(value => this.updateValidStatus());
   this.enComponent.enForm.statusChanges.subscribe(value => this.updateValidStatus());
 }
  ngOnInit() {

    this.blueprintDeForm = new FormGroup({
      'chbox': new FormControl(false),
      'nameNFA': new FormArray([]),
      'characteristic': new FormControl(null),
      'property': new FormControl(null),
      'modalVerb': new FormControl(null),
      'qualifyingEx': new FormControl(null),
      'valueInput': new FormControl(null),
      'verb': new FormControl(null)
    });

    this.blueprintEnForm = new FormGroup({
      'nameNFA': new FormControl(null),
      'characteristic': new FormControl(null),
      'property': new FormControl(null),
      'modalVerb': new FormControl(null),
      'qualifyingEx': new FormControl(null),
      'valueInput': new FormControl(null),
      'verb': new FormControl('be')
    });

   /* this.blueprintDeForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '<Eigenschaft>', 'property': '<Bertachtungsgegenstand>',
      'modalVerb': null, 'qualifyingEx': '<Vergleichsop>', 'valueInput': '<Wert>', 'verb': '<Verb>' });

    this.blueprintEnForm.setValue({'nameNFA': null, 'characteristic': '<Characteristic>', 'property': '<Property>',
      'modalVerb': null, 'qualifyingEx': '<qualifyingExpr>', 'valueInput': '<Value>', 'verb': 'be' });*/
  }

  onSubmit() {

    this.blueprintDeForm.patchValue(this.deComponent.deForm.value);
    this.checked = this.blueprintDeForm.get('chbox').value;
    if (this.blueprintDeForm.get('valueInput').value === null) {
      this.blueprintDeForm.get('valueInput').reset('<Wert>');
    }

    this.deComponent.deForm.get('modalVerb').disable({});
    this.deComponent.deForm.get('valueInput').disable({});

    this.blueprintEnForm.patchValue(this.enComponent.enForm.value);
    if (this.blueprintEnForm.get('valueInput').value === null) {
      this.blueprintEnForm.get('valueInput').reset('<Value>');
    }

    if (this.blueprintDeForm.get('qualifyingEx').value != null) {
      this.blueprintEnForm.get('qualifyingEx').reset(QualifiyingExpression.resolve(
        this.blueprintDeForm.get('qualifyingEx').value).en);
    }
  }

  Reset() {
   this.checked = false;
   this.deComponent.resetForm();
   this.enComponent.resetForm();
    this.blueprintDeForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '<Eigenschaft>', 'property': '<Bertachtungsgegenstand>',
      'modalVerb': null, 'qualifyingEx': '<Vergleichsoperator>', 'valueInput': '<Wert>', 'verb': '<Verb>' });

    this.blueprintEnForm.setValue({'nameNFA': null, 'characteristic': '<Characteristic>', 'property': '<Property>',
      'modalVerb': null, 'qualifyingEx': '<qualifyingExpr>', 'valueInput': '<Value>', 'verb': 'be' });
  }

  private updateValidStatus() {
   this.valid = (this.deComponent.deForm.status === 'VALID')
     && (this.enComponent.enForm.status === 'VALID');
  }
}
