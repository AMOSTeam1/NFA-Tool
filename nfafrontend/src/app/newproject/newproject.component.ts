import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Project} from './project.model';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],

})
export class NewprojectComponent implements OnInit {
  messageField;
  project = new Project();

  showDialog;
  constructor(private dataStorage: DataStorageService) {}


  fieldArray: Array<any> = [];
  newAttribute: any = {};



  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};


  }


  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  ngOnInit() {
  }


  onSubmit() {

    this.dataStorage.storeProject(this.project).subscribe((response) => {
      console.log(response.json());
      // TODO -> check server-failure and show some message...
      this.project = response.json();
      this.messageField = 'A new project with ID ' + this.project.id + ' created';
      this.project = new Project();
    });
  }

  clearMessage() {
    this.messageField = '';
  }
}

