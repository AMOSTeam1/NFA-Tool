import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewnfaComponent} from './newnfa/newnfa.component';
import {NfacatalogComponent} from './nfacatalog/nfacatalog.component';
import {HomeComponent} from './home/home.component';
import {CurrentProjectComponent} from './current-project/current-project.component';
import {ProjectEditComponent} from './current-project/project-edit/project-edit.component';
import {ProjectDetailComponent} from './current-project/project-detail/project-detail.component';
import {StakeHolderComponent} from './current-project/stake-holder/stake-holder.component';
import {NfacatalogListComponent} from './nfacatalog/nfacatalog-list/nfacatalog-list.component';
import {NfacatalogCriteriaComponent} from './nfacatalog/nfacatalog-criteria/nfacatalog-criteria.component';
import {NfacatalogMetricComponent} from './nfacatalog/nfacatalog-criteria/nfacatalog-metric/nfacatalog-metric.component';
import {NfacatalogNfaComponent} from './nfacatalog/nfacatalog-criteria/nfacatalog-nfa/nfacatalog-nfa.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'newnfa', component: NewnfaComponent},
  {path: 'nfacatalog', component: NfacatalogComponent, children: [
      {path: 'list', component: NfacatalogListComponent},
      {path: 'list/:id', component: NfacatalogCriteriaComponent, children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent},


    ]}
  ]},
  {path: 'home', component: HomeComponent},
  {path:  'curr-projects/:project_id/edit/nfa', component: NfacatalogComponent, children:[
      {path: '', component: NfacatalogListComponent },
      {path: ':project_id', component: NfacatalogCriteriaComponent, children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent},
          {path: ':criteria_id/:metric_id/edit', component: NfacatalogNfaComponent}
        ]}

  ]},

  {path:  'curr-projects/new/nfa', component: NfacatalogComponent, children:[
      {path: '', component: NfacatalogListComponent},
      {path: ':project_id', component: NfacatalogCriteriaComponent, children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent}
        ]}

    ]},
  {path: 'curr-projects', component: CurrentProjectComponent, children: [
    {path:  'new', component: ProjectEditComponent},
    {path: ':project_id', component: ProjectDetailComponent,},
    {path: ':project_id/edit', component: ProjectEditComponent},
    {path: ':project_id/edit/stakeholder', component: StakeHolderComponent}
  ]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
