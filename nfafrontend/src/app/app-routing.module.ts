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
import {NfacatalogCriteriaListComponent} from './nfacatalog/nfacatalog-criteria/nfacatalog-criteria-list/nfacatalog-criteria-list.component';
import {NfacatalogMetricComponent} from './nfacatalog/nfacatalog-criteria/nfacatalog-metric/nfacatalog-metric.component';

const appRoutes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'newpackage', component: NewpackageComponent},
  {path: 'newnfa', component: NewnfaComponent},
  {path: 'nfacatalog', component: NfacatalogComponent, children: [
    {path: 'list', component: NfacatalogListComponent},
    {path: 'list/:id', component: NfacatalogCriteriaComponent, children: [
      {path: ':criteria_id', component: NfacatalogMetricComponent}
    ]}
  ]},
  {path: 'home', component: HomeComponent},
  {path: 'curr-projects', component: CurrentProjectComponent, children: [
    {path:  'new', component: ProjectEditComponent},
    {path: ':id', component: ProjectDetailComponent},
    {path: ':id/edit', component: ProjectEditComponent},
    {path: ':id/edit/stakeholder', component: StakeHolderComponent}
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
