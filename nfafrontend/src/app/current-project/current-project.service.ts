import {Subject} from 'rxjs/Subject';
import {Currentproject} from '../shared/currentproject.model';


export class CurrentProjectService {
  projectsChanged = new Subject<Currentproject[]>();
  //private projects: Currentproject[];
  private projects: Currentproject[] = [
    new Currentproject('1', 'ArbeitAgentur', 'James', 'Thomas', 'Public Sector', 'Communication',
      'agil', 'lastenheft', 'onprocess'),
    new Currentproject('2', 'XYZ Agentur', 'Greg', 'Walt', 'Automotive', 'Datenaustausch',
      'Klassisch', 'Pflichtenheft', 'onprocess')
  ];


  getProjects() {
    return this.projects.slice();
  }

  getProject(index: number) {
    return this.projects[index];
  }

  updateProject(index: number, newProject: Currentproject) {
    this.projects[index] = newProject;
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProject(index: number) {
    this.projects.splice(index,1);
    this.projectsChanged.next(this.projects.slice());
  }

  setProjects(projects: Currentproject[]){
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }
}
