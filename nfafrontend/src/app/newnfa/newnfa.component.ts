import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Nfa} from '../shared/nfa.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';


@Component({
  selector: 'app-newnfa',
  templateUrl: './newnfa.component.html',
  styleUrls: ['./newnfa.component.css']
})
export class NewnfaComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }
  nfaform: FormGroup;

  ngOnInit() {
    this.initForm();
  }

private initForm () {

   this.nfaform = new FormGroup ({
    'factor' : new FormControl('', Validators.required),
    'criteria': new FormControl('', Validators.required),
    'metric': new FormControl('', Validators.required),
    'nfa_type': new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    const nfa = new Nfa(
      this.nfaform.value['factor'],
      this.nfaform.value['criteria'],
      this.nfaform.value['metric'],
      this.nfaform.value['nfa_type'],
    )
    this.dataStorageService.postNfa(nfa)
      .subscribe(
        (response: Response) => {
          console.log(response.json);
        }
      );

  }
}
