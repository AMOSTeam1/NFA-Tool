import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Nfa} from '../shared/nfa.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';
import {NfaFactorModel} from "../shared/nfaFactor.model";
import {NfacatalogService} from "../nfacatalog/nfacatalog.service";
import {NfaCriteriaModel} from "../shared/nfaCriteria.model";


@Component({
  selector: 'app-newnfa',
  templateUrl: './newnfa.component.html',
  styleUrls: ['./newnfa.component.css']
})
export class NewnfaComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private nfaCatalogService: NfacatalogService,) { }
  nfaform: FormGroup;
  nfaFactors: NfaFactorModel[];

  selectedFactor = NfaFactorModel;
  selectedCriteria = NfaCriteriaModel;
  selectedMetric: any;
  selectedType: any;

  ngOnInit() {
    this.initForm();

    this.dataStorageService.getNfaFactor()
      .subscribe(
        (response: Response) => {
          const nfaFactors: NfaFactorModel[]=response.json();
          this.nfaCatalogService.setNfaFactors(nfaFactors);
          this.nfaFactors = nfaFactors;
        }
      );
  }

private initForm () {

   this.nfaform = new FormGroup ({
    'factor' : new FormControl('', Validators.required),
    'criteria': new FormControl('', Validators.required),
    'metric': new FormControl('', Validators.required),
    'nfa_type': new FormControl('', Validators.required),
     'nfa_content': new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    const nfa = new Nfa(
      this.nfaform.value['factor'],
      this.nfaform.value['criteria'],
      this.nfaform.value['metric'],
      this.nfaform.value['nfa_type'],
    );
    this.dataStorageService.postNfa(nfa)
      .subscribe(
        (response: Response) => {
          console.log(response.json);
        }
    );

  }

}
