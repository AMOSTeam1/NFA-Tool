import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {

  archived = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      params => console.log(<boolean> params.hasOwnProperty("archived") && params.archived)
    );

    this.route.params.subscribe(
      params => this.archived = (<boolean> params.hasOwnProperty("archived") && params.archived)
    );
    console.log(this.route);
    console.log(this.archived);



  }

}
