import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataexchangeService} from '../../../shared/dataexchange.service';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import {isNull, isNumber} from 'util';
import {QualifiyingExpression} from '../../../shared/blueprints/QualifiyingExpression.model';

@Component({
  selector: 'app-ennfaform',
  templateUrl: './ennfaform.component.html',
  styleUrls: ['./ennfaform.component.css']
})
export class EnnfaformComponent implements OnInit {
  checked = false;
  @Input() send = false;
  @Output() submitEvent = new EventEmitter<FormGroup>();
  enForm: FormGroup;


  constructor(private data: DataexchangeService) { }

  ngOnInit() {
    this.enForm = new FormGroup({
      'nameNFA': new FormControl(null, Validators.required),
      'characteristic': new FormControl(null, Validators.required),
      'property': new FormControl(null, Validators.required),
      'modalVerb': new FormControl(null),
      'qualifyingEx': new FormControl(null, Validators.required),
      'valueInput': new FormControl(null),
      'verb': new FormControl('be')
    });
    this.data.currentMessage.subscribe(message => {
      if ((message.verb === 'muessen') || (message.verb === 'muss')) {
        this.enForm.get('modalVerb').reset('shall');
      }
      if ((message.verb === 'sollen') || (message.verb === 'soll')) {
        this.enForm.get('modalVerb').reset('should');
      }
      if ((message.verb === 'koennen') || (message.verb === 'kann')) {
        this.enForm.get('modalVerb').reset('can');
      }

      if (message.verb === null) {
        this.enForm.get('modalVerb').reset(null);
      }
      this.enForm.get('valueInput').reset(message.wert);

      this.enForm.get('qualifyingEx').reset(
        message.qualifExp ? (message.qualifExp.en + (message.qualifExp.abundant ? (' / ' + message.qualifExp.abundant.en) : '')) : '');

    });

  }

  resetForm() {
    this.enForm.reset();
  }
}
