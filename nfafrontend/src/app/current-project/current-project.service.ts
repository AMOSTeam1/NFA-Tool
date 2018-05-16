import {Subject} from 'rxjs/Subject';
import {Project} from '../shared/project.model';


export class CurrentProjectService {
  projectsChanged = new Subject<Project[]>();
  private projects: Project[];


  // getProjects(archived = false) {
  //   return this.projects.slice().filter(
  //
  //     value => value.isArchived === archived
  //   );
  // }

  getProjects() {
    return this.projects.slice();
  }

  getProject(index: number) {
    return this.projects[index];
  }

  updateProject(index: number, newProject: Project) {
    this.projects[index] = newProject;
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProject(index: number) {
    this.projects.splice(index,1);
    this.projectsChanged.next(this.projects.slice());
  }

  setProjects(projects: Project[]){
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }
}
