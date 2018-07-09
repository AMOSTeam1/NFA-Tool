import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Inst} from './blueprints/inst.model';


@Injectable()
export class DataexchangeService {
//Define Lookup-Name in Local Storage
  static selNfs : string = 'selNfs';
  static currProject : string = 'currProject';
  static project_mode : string = 'project_mode';

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


