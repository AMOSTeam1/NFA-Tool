import {Component, Input, OnInit} from '@angular/core';
import {Currentproject} from '../../../shared/currentproject.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Currentproject;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
