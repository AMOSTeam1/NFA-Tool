import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewprojectComponent} from './newproject/newproject.component';
import {NewpackageComponent} from './newpackage/newpackage.component';
import {NewnfaComponent} from './newnfa/newnfa.component';
import {NfacatalogComponent} from './nfacatalog/nfacatalog.component';
import {HomeComponent} from './home/home.component';
import {CurrentProjectComponent} from './current-project/current-project.component';
import {ProjectEditComponent} from './current-project/project-edit/project-edit.component';
import {ProjectDetailComponent} from './current-project/project-detail/project-detail.component';

const appRoutes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'newproject' , component: NewprojectComponent},
  {path: 'newpackage', component: NewpackageComponent},
  {path: 'newnfa', component: NewnfaComponent},
  {path: 'nfacatalog', component: NfacatalogComponent},
  {path: 'home', component: HomeComponent},
  {path: 'curr-projects', component: CurrentProjectComponent, children: [
    {path: ':id', component: ProjectDetailComponent},
    {path: ':id/edit', component: ProjectEditComponent}
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
