import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewprojectComponent} from './newproject/newproject.component';
import {NewpackageComponent} from './newpackage/newpackage.component';
import {NewnfaComponent} from './newnfa/newnfa.component';
import {NfacatalogComponent} from './nfacatalog/nfacatalog.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'newproject' , component: NewprojectComponent},
  {path: 'newpackage', component: NewpackageComponent},
  {path: 'newnfa', component: NewnfaComponent},
  {path: 'nfacatalog', component: NfacatalogComponent},
  {path: 'home', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
