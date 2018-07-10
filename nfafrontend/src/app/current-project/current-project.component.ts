import { Component, OnInit } from '@angular/core';
import {CurrentProjectService} from "./current-project.service";
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
