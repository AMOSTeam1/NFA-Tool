import {Subject} from 'rxjs/Subject';
import {Project} from '../shared/project.model';
import {ProjectType} from '../shared/type.model';
import {Stakeholder} from '../shared/stakeholder.model';
import {NfaCustomModel} from "../shared/nfaCustom.model";


export class CurrentProjectService {

  projectsChanged = new Subject<Project[]>();
  private projectsSubset: Project[];
  private types: ProjectType[];
  private currently_edited_project : Project;
  private nfaMode : boolean;
  private status : string;
  private custom_nfas : NfaCustomModel[] = [];
  private selectedNfa : number = 0;

  getProjects() {
    console.debug("The this.projectsSubset is ");
    console.debug(this.projectsSubset);

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

  hasCurrentlyEditedProject(){
    console.debug("Is there a project set that is being edited? " + !!this.currently_edited_project);
    if(!!this.currently_edited_project){
      console.debug(this.currently_edited_project.projectNfas);
    }
    return !!this.currently_edited_project;
  }

  getCurrentlyEditedProject() : Project {
    if(this.currently_edited_project){
      return this.currently_edited_project;
    }
    const message : string = "There is no Project set yet.";

    console.log(message);
    throw new Error(message);
  }

  setCurrentlyEditedProject(proj: Project){
    if(proj){
      console.debug("for the newly edited project the nfas will be:");
      console.debug(proj.projectNfas);
      this.currently_edited_project = proj;
    }
    else {
      console.debug("Cannot set " + proj.toString() + " as CurrentlyEditedProject");
    }
  }

  clearEditedProject(){
    this.currently_edited_project = null;
  }

  setProjectById(projId: number){
    this.currently_edited_project = this.getProjectById(projId);
  }

  addProject(project: Project) {
    this.projectsSubset.push(project);
    this.projectsChanged.next(this.projectsSubset.slice());
  }

  updateProject(id: number, newProject: Project) {
    console.debug("updateProject(id: number, newProject: Project) {");
    console.debug(id);
    console.debug(newProject);
    console.debug(this.projectsSubset);
    console.debug("----------------- DONE -------------------------");


    for(let index in this.projectsSubset){
      if(this.projectsSubset[index].id == id){
        console.debug(index + " + " + id);
        console.debug(this.projectsSubset[index]);
        this.projectsSubset[index] = newProject;
      }
    }
    console.debug(this.projectsSubset);
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

  setCustomNfa(customNfas: NfaCustomModel[]){
    console.debug("Refresh Custom NFAS");
    console.debug(customNfas);
    this.custom_nfas = customNfas;
  }

  getCustomNfa(originalId: number) : NfaCustomModel {
    let index : number = 0;

    //This list can contain multiple entries from one originalNfa.
    //However, the list is ordered from newest to oldest, so we always take the first.
    for(let nfa of this.custom_nfas){
      if(nfa.originalNfa.id == originalId){
        return this.custom_nfas[index];
      }
      index++;
    }

   return null;
  }

  setSelectedNfaId(selNfa: number){
    this.selectedNfa = selNfa;
  }

  getSelectedNfaId() : number {
    return this.selectedNfa;
  }

}
