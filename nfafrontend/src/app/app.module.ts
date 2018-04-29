import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewprojectComponent } from './newproject/newproject.component';
import { NfacatalogComponent } from './nfacatalog/nfacatalog.component';
import { NewnfaComponent } from './newnfa/newnfa.component';
import { NewpackageComponent } from './newpackage/newpackage.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ServerServices} from './newproject/server.services';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataStorageService} from './shared/data-storage.service';
import {Http, HttpModule} from '@angular/http';


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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [DataStorageService],
  providers: [ServerServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
