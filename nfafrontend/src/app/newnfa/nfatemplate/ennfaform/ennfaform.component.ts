import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import {isNull, isNumber} from 'util';

@Component({
  selector: 'app-ennfaform',
  templateUrl: './ennfaform.component.html',
  styleUrls: ['./ennfaform.component.css']
})
export class EnnfaformComponent implements OnInit , OnChanges {
  checked = false;
  @Input() send = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  message: string;
  enForm: FormGroup;


  constructor(private data: DataexchangeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.send === true){
      this.onSubmit();}
  }
  ngOnInit() {
    this.enForm = new FormGroup({
      'nameNFA': new FormControl(null),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl(null),
      'qualifyingEx': new FormControl(null),
      'valueInput': new FormControl({value: null}),
      'verb': new FormControl(null)
    });

    this.data.currentMessage.subscribe(message => {
      this.message = message;
      if (isNaN(parseFloat(this.message))) {
        if ((this.message === 'muessen') || (this.message === 'muss')) {
          this.enForm.get('modalVerb').reset('shall');
        }
        if ((this.message === 'sollen') || (this.message === 'soll')) {
          this.enForm.get('modalVerb').reset('should');
        }
        if ((this.message === 'koennen') || (this.message === 'kann')) {
          this.enForm.get('modalVerb').reset('can');
        }
      } else {
        this.enForm.get('valueInput').reset(parseFloat(this.message));
      }
    });
    this.enForm.setValue({'nameNFA': null, 'characteristic': '[Eigenschaft]', 'property': '[Bertachtungs-' +
      'gegenstand]',
      'modalVerb': null, 'qualifyingEx': 'some', 'valueInput': '[Wert]', 'verb': 'null' });
  }
  onSubmit() {
    this.submitEvent.emit(this.enForm.value);
  }
}
