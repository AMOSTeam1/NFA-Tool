import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewpackageComponent} from './newpackage/newpackage.component';
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
  {path: 'newpackage', component: NewpackageComponent, canActivate: [AuthGuard]},
  {path: 'newnfa', component: NewnfaComponent, canActivate: [AuthGuard]},
  {path: 'nfacatalog', component: NfacatalogComponent, canActivate: [AuthGuard], children: [
      {path: 'list', component: NfacatalogListComponent, canActivate: [AuthGuard]},
      {path: 'list/:id', component: NfacatalogCriteriaComponent, canActivate: [AuthGuard], children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent, canActivate: [AuthGuard]},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent, canActivate: [AuthGuard]},


    ]}
  ]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:  'curr-projects/:id/edit/nfa', component: NfacatalogComponent, canActivate: [AuthGuard], children:[
      {path: '', component: NfacatalogListComponent, canActivate: [AuthGuard]},
      {path: ':id', component: NfacatalogCriteriaComponent, canActivate: [AuthGuard], children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent, canActivate: [AuthGuard]},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent, canActivate: [AuthGuard]}
        ]}

  ]},

  {path:  'curr-projects/new/nfa', component: NfacatalogComponent, canActivate: [AuthGuard], children:[
      {path: '', component: NfacatalogListComponent, canActivate: [AuthGuard]},
      {path: ':id', component: NfacatalogCriteriaComponent, canActivate: [AuthGuard], children: [
          {path: ':criteria_id', component: NfacatalogMetricComponent, canActivate: [AuthGuard]},
          {path: ':criteria_id/:metric_id', component: NfacatalogNfaComponent, canActivate: [AuthGuard]}
        ]}

    ]},
  {path: 'curr-projects', component: CurrentProjectComponent, canActivate: [AuthGuard], children: [
    {path:  'new', component: ProjectEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ProjectDetailComponent, canActivate: [AuthGuard]},
    {path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard]},
    {path: ':id/edit/stakeholder', component: StakeHolderComponent, canActivate: [AuthGuard]}
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
