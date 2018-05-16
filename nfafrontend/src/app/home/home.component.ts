import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'NFA-Tool';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickCurrent() {
    this.router.navigate(['/curr-projects']);
  }

  onClickArchived() {
    this.router.navigate(['/curr-projects', { archived: 1}]);
  }

}
