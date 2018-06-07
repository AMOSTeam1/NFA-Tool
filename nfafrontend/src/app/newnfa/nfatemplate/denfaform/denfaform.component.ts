import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';

@Component({
  selector: 'app-denfaform',
  templateUrl: './denfaform.component.html',
  styleUrls: ['./denfaform.component.css']
})
export class DenfaformComponent implements OnInit, OnChanges {
  deForm: FormGroup;
  message: string;
  @Input() send = false;
  @Input() reseted = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  constructor(private data: DataexchangeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.send === true){
     this.onSubmit();}
  }
  ngOnInit() {
    this.deForm = new FormGroup({
      'chbox': new FormControl(null),
      'nameNFA': new FormControl(null),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl({value: null, disabled: true}),
      'qualifyingEx': new FormControl(null),
      'valueInput': new FormControl({value: null, disabled: true}),
      'verb': new FormControl(null)
    });

    this.data.currentMessage.subscribe(message => this.message = message);
  }
  isChecked(event: any) {
     if (event.currentTarget.checked === true) {
      this.deForm.get('modalVerb').enable({});
      this.deForm.get('valueInput').enable({});
    } else {
      this.deForm.get('modalVerb').disable({});
      this.deForm.get('valueInput').disable({});
    }
  }
  onSubmit() {
    this.submitEvent.emit(this.deForm.value);
  }

  Reset() {
  this.deForm.reset();
  }

  newMessage(event: any) {
    this.data.changeMessage(event.currentTarget.value);
    // this.data.changeMessage(this.deForm);
    }
}
