import {Component, OnInit, state} from '@angular/core';
import {User} from './shared/user';
import {AuthenticationService} from './shared/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    // set current user from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // subscribe to authentication status updates to set and remove the current user on login and logout
    this.authenticationService.getStatus().subscribe(currentUser => this.currentUser = currentUser);
  }


  }


