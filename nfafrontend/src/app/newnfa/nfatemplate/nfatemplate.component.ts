import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DenfaformComponent} from './denfaform/denfaform.component';
import {EnnfaformComponent} from './ennfaform/ennfaform.component';

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
  @ViewChild (DenfaformComponent) deform;
  @ViewChild (EnnfaformComponent) enform;
  @Output() submitTemplate = new EventEmitter<FormGroup>();

  definition = {
    characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>'
  };

 constructor() {

 }
 ngAfterViewInit() {

 }
  ngOnInit() {

    this.blueprintDeForm = new FormGroup({
      'chbox': new FormControl(null),
      'nameNFA': new FormControl(null),
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

    this.blueprintDeForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '<Eigenschaft>', 'property': '<Bertachtungs-' +
      'gegenstand>',
      'modalVerb': null, 'qualifyingEx': '<Vergleichsop>', 'valueInput': '<Wert>', 'verb': '<Verb>' });

    this.blueprintEnForm.setValue({'nameNFA': null, 'characteristic': '<Characteristic>', 'property': '<Property>',
      'modalVerb': null, 'qualifyingEx': '<qualifyingExpr>', 'valueInput': '<Value>', 'verb': 'be' });
   }
  onSubmit() {
   this.deform.onSubmit();
    this.enform.onSubmit();

  }


    receiveDataDe(event: any) {
      this.blueprintDeForm.patchValue(event);
      console.log(this.blueprintDeForm.value);
      this.checked = this.blueprintDeForm.get('chbox').value;
      if (this.blueprintDeForm.get('valueInput').value === null) {
        this.blueprintDeForm.get('valueInput').reset('<Wert>');
      }

    }

      receiveDataEn(event: any) {
      this.blueprintEnForm.patchValue(event);
      if (this.blueprintEnForm.get('valueInput').value === null) {
          this.blueprintEnForm.get('valueInput').reset('<Value>');
        }
    }

  Reset() {
    this.blueprintDeForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '<Eigenschaft>', 'property': '<Bertachtungs-' +
      'gegenstand>',
      'modalVerb': null, 'qualifyingEx': '<Vergleichsop>', 'valueInput': '<Wert>', 'verb': '<Verb>' });

    this.blueprintEnForm.setValue({'nameNFA': null, 'characteristic': '<Characteristic>', 'property': '<Property>',
      'modalVerb': null, 'qualifyingEx': '<qualifyingExpr>', 'valueInput': '<Value>', 'verb': 'be' });

    this.deform.reset();
    this.enform.reset();

  }

}
