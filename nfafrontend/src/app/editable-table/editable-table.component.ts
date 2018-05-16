import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';


import { EditableTableService } from './editable-table.service';
import {Response} from '@angular/http';
import {Type} from '../shared/type.model';
import {DataStorageService} from '../shared/data-storage.service';
//import {Parent} from '../newproject/newproject.component';


@Component({
  selector: 'nv-editable-table',
  template: `
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <table class="{{class}}">
            <thead>
            <tr>
              <th *ngFor="let title of service.tableHeadersObjects">{{title.content}}</th>
              <th *ngIf="canEditRows||canDeleteRows"></th>
            </tr>
            </thead>
            <tbody>
            <tr class="{{trClass}}" *ngFor="let row of service.tableRowsObjects">
              <td class="{{tdClass}}" *ngFor="let cell of row.cells">
                    <span *ngIf="service.isEditing.indexOf(row) === -1 && service.checkTypeOf(cell.content) !== 'boolean'">
                      {{cell.content}}
                    </span>
                <span *ngIf="service.isEditing.indexOf(row) === -1 && service.checkTypeOf(cell.content) == 'boolean'">
                      {{cell.content ? 'Activo' : 'Inactivo'}}
                    </span>
                <div class="ui input requiredInput" [ngClass]="{errorClass: !cell.content && cell.touched}"
                     *ngIf="!(service.isEditing.indexOf(row) == -1) && service.checkTypeOf(cell.content) !== 'boolean' && isRequired">
                  <select class="form-control" id="type" name="projecttypes" [(ngModel)]="cell.content" [name]="cell.content" canEditRows = "true">
                    <option value="">--Select--</option>
                    <option *ngFor="let t of types" [value]="t.englishName" >{{t.englishName}}</option>
                  </select>
                  <br>
                  <div [ngClass]="{'show': !cell.content && cell.touched, 
                                      'hide': cell.content}" class="divmessage" style="Color: red;" [hidden]="cell.content">
                    <div>{{requiredMessage}}</div>
                  </div>
                </div>
              </td>      
          <td class={{buttonsTdClass}} *ngIf="canEditRows||canDeleteRows">
                    <button class={{editButtonClass}} *ngIf="service.isEditing.indexOf(row) === -1 && canEditRows" (click)="editRow(row)">
                     <i class="material-icons">mode_edit</i>{{editButtonLabel}}
                    </button>
                    <button class={{editButtonClass}} *ngIf="!(service.isEditing.indexOf(row) == -1) && canEditRows"
                      (click)="saveRow(row)">
                      <i class="material-icons">check</i>{{saveButtonLabel}}
                    </button>
                    <button class={{deleteButtonClass}} *ngIf="canDeleteRows && service.isEditing.indexOf(row) === -1" 
                    (click)="deleteRow(row)">
                      <i class="material-icons">delete_forever</i>{{deleteButtonLabel}}
                    </button>
                    <button class={{deleteButtonClass}} *ngIf="!(service.isEditing.indexOf(row) == -1) && canEditRows"
                     (click)="deleteRow(row)">
                      <i class="material-icons">delete_forever</i>{{cancelButtonLabel}}
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th *ngFor="let title of service.tableHeadersObjects"></th>
                  <th *ngIf="canEditRows||canDeleteRows">
                      <button class={{addButtonClass}} (click)="addRow(); $event.preventDefault()" *ngIf="canAddRows">
                         <i class="material-icons">add</i>{{addButtonLabel}}
                      </button>
                  </th>
                </tr>
              </tfoot>
            </table>
  `,
  styles: [`tfoot{text-align: right;} 
  .myerror{color:red} 
  .requiredInput.divmessage{display:none} 
  .requiredInput.divmessage.show{display:block !important} 
  .requiredInput.divmessage.hide{display:none}`],
  providers: [EditableTableService]
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: string[] = ['Project Type'];
  @Input('table-rows') tableRows: any[][] = [];
  @Input('table-rows-with-id') tableRowsWithId: any[][] = [];
  @Input('can-delete-rows') canDeleteRows = true;
  @Input('can-edit-rows') canEditRows = true;
  @Input('can-add-rows') canAddRows = true;

  @Input('add-button-label') addButtonLabel: string;
  @Input('edit-button-label') editButtonLabel: string;
  @Input('save-button-label') saveButtonLabel: string;
  @Input('cancel-button-label') cancelButtonLabel: string;
  @Input('delete-button-label') deleteButtonLabel: string;

  @Input('add-icon') addIcon = 'fa fa-plus';
  @Input('edit-icon') editIcon = 'fa fa-pencil-square-o';
  @Input('save-icon') saveIcon = 'fa fa-check';
  @Input('delete-icon') deleteIcon = 'fa fa-times';

  @Input('add-button-class') addButtonClass: string;
  @Input('edit-button-class') editButtonClass: string;
  @Input('delete-button-class') deleteButtonClass: string;

  @Input('tr-class') trClass: string;
  @Input('td-class') tdClass: string;
  @Input('buttons-td-class') buttonsTdClass: string;
  @Input('class') class: string;
  @Input('data-type') dataType = [];

  @Input() errorClass = 'myerror';
  @Input() isRequired = true;
  @Input() requiredMessage = 'This field cannot be empty';


  @Output() onSave = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
 @Output() onSelect= new EventEmitter<any>();

  service: EditableTableService;
  types: Type[];
  selectedTypes: Type[];
  projectTypeName: string[];
  selectedOption: Type[];
  constructor(service: EditableTableService, private dataStorageService: DataStorageService) {
    this.service = service;
    
  }

  ngOnInit() {
    if (this.tableRows.length > 0 || (this.tableRows !== undefined && this.tableRowsWithId.length === 0)) {
      this.service.createTable(this.tableHeaders, this.tableRows, this.dataType);
    } else if (this.tableRowsWithId.length > 0 || (this.tableRowsWithId !== undefined && this.tableRows.length === 0)) {
      this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
    }

this.selectedTypes = [];
    this.dataStorageService.getAllTypes()
      .subscribe(
        (response: Response) => {
          const types: Type[] = response.json();
          this.types = types;
        }
      );

  }


  addRow() {
    this.service.addRow();
  }

  editRow(selectedRow: TableRow) {
    this.service.editRow(selectedRow);
  }

  cancelEdition(selectedRow: TableRow) {
    this.service.cancelEdition(selectedRow);
  }

  saveRow(selectedRow: TableRow) {
    debugger;
    for (const cell of selectedRow.cells) {
      if ((cell.content == null || cell.content === '') && this.isRequired) {
        return;
      }
    }
    this.service.saveRow(selectedRow);
    const dir = [];

    for (let i = 0; i < selectedRow.cells.length; i++) {
      dir.push(selectedRow.cells[i].content);
    }
  
    console.log(this.selectedTypes);
    const obj = { id: selectedRow.id, cells: dir };
    var x = this.types.find(function(element){
    return element.englishName == dir;
    });
    this.selectedTypes.push(x);
    this.onSelect.emit(this.selectedTypes);
    //this.service.addSelectedTypes(x);
    //this.Parent.selectedTypes.push(x);
    //this.selectedOption.push(cell.content);
    this.onSave.emit(obj);
  }

  deleteRow(selectedRow: TableRow) {
    this.service.deleteRow(selectedRow);
    const dir = [];

    for (let i = 0; i < selectedRow.cells.length; i++) {
      dir.push(selectedRow.cells[i].content);
    }
    const obj = { id: selectedRow.id, cells: dir };

    this.onRemove.emit(obj);

  }



}
