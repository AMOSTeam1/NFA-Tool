import {Subject} from 'rxjs/Subject';
import {Project} from '../shared/project.model';
import {ProjectType} from '../shared/type.model';
import {Stakeholder} from '../shared/stakeholder.model';


export class CurrentProjectService {

  projectsChanged = new Subject<Project[]>();
  private projectsSubset: Project[];
  private types: ProjectType[];
  private selectedProjectId: number;
  private project : Project;
  private nfaMode : boolean;
  private status : string;

  getProjects() {
    return this.projectsSubset.slice();
  }

  getProjectById(projectId: number) : Project {
    for(let index in this.projectsSubset) {

      if (this.projectsSubset[index].id == projectId) {

        return this.projectsSubset[index];
      }
    }
    console.error("Project with Id " + projectId + " is not Part of the current Subset");
    return null;
  }

  getProject(index: number) : Project {
    if(this.projects){
      return this.projects[index];
    }

    const message : string = "There are no Projects loaded yet.";

    console.log(message);
    throw new Error(message);
  }

  getProjectWithNoId(){
    return this.project;
  }

  setProject(proj: Project){
    this.project = proj;
  }

  setProjectById(projId: number){
    this.project = this.getProjectById(projId);
  }

  addProject(project: Project) {
    this.projectsSubset.push(project);
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  updateProject(id: number, newProject: Project) {
    for(let index in this.projectsSubset){
      if(this.projectsSubset[index].id == id){
        this.projectsSubset[index] = newProject;
      }
    }
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  deleteProjectById(id: number) {
    for(let index in this.projectsSubset){
      if(this.projectsSubset[index].id == id){
        this.projectsSubset.splice(Number(index),1);
      }
    }
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  setProjects(projects: Project[]){
    this.projectsSubset = projects;
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  setSelectedProjectId(index: number){
    this.selectedProjectId = index;
  }
  getSelectedProjectId(){
    return this.selectedProjectId;
  }
  getNfa(index: number){
    return this.projectsSubset[this.selectedProjectId].projectNfas[index];
  }

  getTypes() {
    return this.types.slice();
  }

  setTypes(types: ProjectType[]){
    this.types = types;
  }

  updateStakeholder(index: number, stakeholder: Stakeholder[]) {
    this.projectsSubset[index].projectStakeholders = stakeholder;
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(value: string) {
    this.status = value;
  }

}
