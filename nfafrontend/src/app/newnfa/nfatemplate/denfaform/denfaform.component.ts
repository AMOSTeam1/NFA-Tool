import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';
import {Inst} from '../../../shared/inst.model';
import {ifTrue} from 'codelyzer/util/function';

@Component({
  selector: 'app-denfaform',
  templateUrl: './denfaform.component.html',
  styleUrls: ['./denfaform.component.css']
})
export class DenfaformComponent implements OnInit, OnChanges {
  deForm: FormGroup;
  @Input() send = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  modalVerbDe: Array<string> = ['muss', 'muessen', 'soll', 'sollen', 'kann', 'koennen'];
  constructor(private data: DataexchangeService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.onSubmit();
  }
  ngOnInit() {
    this.deForm = new FormGroup({
      'chbox': new FormControl(null),
      'nameNFA': new FormControl(null),
      'characteristic': new FormControl(null),
      'property': new FormControl(null),
      'modalVerb': new FormControl({value: null, disabled: true}),
      'qualifyingEx': new FormControl(null),
      'valueInput': new FormControl({value: null, disabled: true}),
      'verb': new FormControl(null)
    });
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
    console.log(this.deForm.value);
    this.submitEvent.emit(this.deForm.value);
    this.deForm.reset();
    this.deForm.get('modalVerb').disable({});
    this.deForm.get('valueInput').disable({});

  }

  newMessage(event: any) {
    if(this.deForm.get('chbox')){
      this.data.changeMessage(new Inst(
        this.deForm.get('valueInput').value,
        this.deForm.get('modalVerb').value
        )
      )}
    }
}
