import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-nfatemplate',
  templateUrl: './nfatemplate.component.html',
  styleUrls: ['./nfatemplate.component.css']
})
export class NfatemplateComponent {
  submitted = false;
  characteristicInput: string;
  definition = {
    characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>'
  };

  // let info = new FormGroup({first: new FormControl(''), second: new FormControl('')})


  //constructor(private modalService: ModalService) { }

 /* public close() {
    this.modalService.destroy();
    console.log(this.definition);

  }*/

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form);
    const modalVerb = '<Modal Verb>';
    const valueOf = '<Value>';
    this.definition.characteristic = form.value.character;
    this.definition.propertyMatter = form.value.propertyMatter;
    this.definition.modalVerb = modalVerb;
    this.definition.qualifyingExpr = form.value.qualifyingExpr;
    this.definition.valueExpr = valueOf;
  }

  Reset() {
    this.definition = {characteristic: '[characteristic]', propertyMatter: '[property]', modalVerb: '', qualifyingExpr: '<qualifying expression>', valueExpr: '<value>'
    };
  }

}
