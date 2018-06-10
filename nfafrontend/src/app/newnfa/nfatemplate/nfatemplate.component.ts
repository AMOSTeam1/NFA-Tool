import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators, FormArray, FormBuilder} from '@angular/forms';
import {DenfaformComponent} from './denfaform/denfaform.component';
import {EnnfaformComponent} from './ennfaform/ennfaform.component';

@Component({
  selector: 'app-nfatemplate',
  templateUrl: './nfatemplate.component.html',
  styleUrls: ['./nfatemplate.component.css']
})
export class NfatemplateComponent implements OnInit, AfterViewInit {

  blueprintForm: FormGroup;
  blueprintEnForm: FormGroup;
  blueprintDe: FormGroup;
  checked = false;
  submitted = false;
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  @ViewChild (DenfaformComponent) deform;
  @ViewChild (EnnfaformComponent) enform;

  definition = {
    characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>'
  };

 constructor() {

 }
 ngAfterViewInit() {

 }
  ngOnInit() {

    this.blueprintForm = new FormGroup({
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

    this.blueprintForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '[Eigenschaft]', 'property': '[Bertachtungs-' +
      'gegenstand]',
      'modalVerb': null, 'qualifyingEx': 'some', 'valueInput': '[Wert]', 'verb': 'null' });
   }
  onSubmit() {
    this.deform.onSubmit();
    this.enform.onSubmit();

    /*this.submitted = true;
    console.log(this.blueprintForm.value);
    this.somearray = this.blueprintForm.value;
    this.definition.characteristic = this.blueprintForm.get('characteristic').value;
    const modalVerb = '<Modal Verb>';
    const valueOf = '<Value>';
    this.definition.propertyMatter = this.blueprintForm.get('property').value;
    this.definition.modalVerb = modalVerb;
    this.definition.qualifyingExpr = this.blueprintForm.get('qualiftingEx').value;
    this.definition.valueExpr = valueOf;*/

  }


    receiveData(event: any) {
      this.blueprintForm.patchValue(event);
      console.log(this.blueprintForm.value);
    }

      receiveData2(event: any) {
      this.blueprintEnForm.patchValue(event);
        console.log(this.blueprintEnForm.value);
    }
 /* receiveData2(event: FormGroup) {
    console.log(event);
    this.blueprintEn.setValue(event.value);
    console.log(this.blueprintEn.value);*/


  Reset() {
  // console.log(new DenfaformComponent().deForm.controls.valueOf());
  //  this.definition = {characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>

    
  }

}
