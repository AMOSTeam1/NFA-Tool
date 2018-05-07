import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Project} from './project.model';
import {NgForm} from '@angular/forms';
import {NFA} from '../nfa';
import {NFAs} from '../mock-nfas'

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  messageField;
  project = new Project();
  nfas = NFAs;
  constructor(private dataStorage: DataStorageService) {}
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
  selectedNFAs: NFA;

  onSelect(nfa: NFA): void {
    this.selectedNFAs = nfa;
  }

}
