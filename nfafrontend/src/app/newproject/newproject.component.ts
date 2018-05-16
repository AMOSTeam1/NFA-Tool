import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Project} from '../shared/project.model';
import {NgForm} from '@angular/forms';
import { EditableTableService } from '../editable-table/editable-table.service';
import {HttpClient} from '@angular/common/http';
import {Type} from '../shared/type.model';


@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],

})
export class NewprojectComponent implements OnInit {
  messageField;
  project = this.initProject();
  tableHeaders = ['Project Type'];
  tableRowsWithId: any[][] = [[1, 'Add Project Type']];

  selectedTypes: Type[];

  showDialog;
  constructor(private dataStorage: DataStorageService, private service: EditableTableService ) {


  dataType = ['option'];

  fieldArray: Array<any> = [];
  newAttribute: any = {};
  allTypes: Type[];

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};


  }


  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }






  ngOnInit() {
    this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
  }


    onRemove(row: any) {
    console.log(row);
  }

onSelect(types: any[]){
this.selectedTypes = types;
}


  onSubmit() {
  debugger;
  console.log(this.service.getSelectedTypes());
    //this.project.types= this.service.getSelectOptions(t);
   // this.project.types = this.selectedTypes;// types
      this.dataStorage.storeProject(this.project).subscribe((response) => {
      console.log(response.json());
      // TODO -> check server-failure and show some message...
      this.project = response.json();
      this.messageField = 'A new project with ID ' + this.project.id + ' created';
      this.project = this.initProject();
    });
  }

  private initProject() {
    return new Project(null, null,null,null,null,null,null,null,null, null);
  }

  clearMessage() {
    this.messageField = '';
  }
  }


