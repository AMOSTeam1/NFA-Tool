import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {FormControl, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Inst} from './blueprints/inst.model';
import {Observable} from 'rxjs/src/Observable';


@Injectable()
export class DataexchangeService {

  private messageSource = new BehaviorSubject<Inst>(new Inst(null, null, null));
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Inst) {
    this.messageSource.next(message);
  }
}


