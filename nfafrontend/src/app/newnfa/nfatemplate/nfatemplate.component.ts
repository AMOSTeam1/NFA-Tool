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

    this.blueprintDeForm.setValue({'chbox': false, 'nameNFA': null, 'characteristic': '[Eigenschaft]', 'property': '[Bertachtungs-' +
      'gegenstand]',
      'modalVerb': null, 'qualifyingEx': 'some', 'valueInput': '[Wert]', 'verb': 'null' });
   }
  onSubmit() {
   this.deform.onSubmit();
    this.enform.onSubmit();


    /*this.submitted = true;
    console.log(this.blueprintDeForm.value);
    this.somearray = this.blueprintDeForm.value;
    this.definition.characteristic = this.blueprintDeForm.get('characteristic').value;
    const modalVerb = '<Modal Verb>';
    const valueOf = '<Value>';
    this.definition.propertyMatter = this.blueprintDeForm.get('property').value;
    this.definition.modalVerb = modalVerb;
    this.definition.qualifyingExpr = this.blueprintDeForm.get('qualiftingEx').value;
    this.definition.valueExpr = valueOf;*/

  }


    receiveData(event: any) {
      this.blueprintDeForm.patchValue(event);
      console.log(this.blueprintDeForm.value);
    }

      receiveData2(event: any) {
      this.blueprintEnForm.patchValue(event);
        console.log(this.blueprintEnForm.value);
    }
 /* receiveData2(event: FormGroup) {
    console.log(event);
    this.blueprintEn.setValue(event.value);
    console.log(this.blueprintEn.value);*/


  Reset() {}
  // console.log(new DenfaformComponent().deForm.controls.valueOf());
  //  this.definition = {characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>


}
