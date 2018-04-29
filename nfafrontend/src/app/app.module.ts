import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewprojectComponent } from './newproject/newproject.component';
import { NfacatalogComponent } from './nfacatalog/nfacatalog.component';
import { NewnfaComponent } from './newnfa/newnfa.component';
import { NewpackageComponent } from './newpackage/newpackage.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ServerServices} from './newproject/server.services';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewprojectComponent,
    NfacatalogComponent,
    NewnfaComponent,
    NewpackageComponent,
    HomeComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ServerServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
