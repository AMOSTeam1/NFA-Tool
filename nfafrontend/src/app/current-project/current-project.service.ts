import {Subject} from 'rxjs/Subject';
import {Project} from '../shared/project.model';
import {ProjectType} from '../shared/type.model';
import {Stakeholder} from '../shared/stakeholder.model';


export class CurrentProjectService {
  projectsChanged = new Subject<Project[]>();
  private projects: Project[];
  private types: ProjectType[];
  private stakeholder: Stakeholder[];


  getProjects() {
    return this.projects.slice();
  }

  getProject(index: number) {
    return this.projects[index];
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
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

  getTypes() {
    return this.types.slice();
  }

  setTypes(types: ProjectType[]){
    this.types = types;
  }

  getStakeholder () {
    return this.stakeholder.slice();
  }

  setStakeholder (stakeholder: Stakeholder[]){
    this.stakeholder = stakeholder;
  }
  /*
  updateStakeholder(index: number, stakeholder: Stakeholder[]) {
    this.projects[index].projectStakeholders = stakeholder;
    this.projectsChanged.next(this.projects.slice());
  }

*/
}
