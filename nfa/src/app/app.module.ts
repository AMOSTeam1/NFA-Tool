import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewNfrProjectComponent } from './new-nfr-project/new-nfr-project.component';
import { NfrCatalogComponent } from './nfr-catalog/nfr-catalog.component';
import { NewNfrComponent } from './new-nfr/new-nfr.component';
import { NfrPackagesComponent } from './nfr-packages/nfr-packages.component';


@NgModule({
  declarations: [
    AppComponent,
    NewNfrProjectComponent,
    NfrCatalogComponent,
    NewNfrComponent,
    NfrPackagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
