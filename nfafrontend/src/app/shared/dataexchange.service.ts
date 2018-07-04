import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {FormControl, Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Inst} from './blueprints/inst.model';


@Injectable()
export class DataexchangeService {
//Define Lookup-Name in Local Storage
  static selNfs : string = 'selNfs';
  static currProject : string = 'currProject';
  static nfaMode : string = 'nfaMode';

  private messageSource = new BehaviorSubject(new Inst(null, null, null));
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Inst) {
    this.messageSource.next(message);
  }


/*  (message: string) {
    this.messageSource.next(message);
  }*/

}


