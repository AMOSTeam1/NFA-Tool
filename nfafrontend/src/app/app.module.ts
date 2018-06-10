import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditableTableModule } from './editable-table/editable-table.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NfacatalogComponent } from './nfacatalog/nfacatalog.component';
import { NewnfaComponent } from './newnfa/newnfa.component';
import { NewpackageComponent } from './newpackage/newpackage.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DataStorageService} from './shared/data-storage.service';
import {Http, HttpModule} from '@angular/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';



// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { DialogComponent } from './dialog/dialog.component';
import { CurrentProjectComponent } from './current-project/current-project.component';
import { ProjectListComponent } from './current-project/project-list/project-list.component';
import { ProjectDetailComponent } from './current-project/project-detail/project-detail.component';
import { ProjectItemComponent } from './current-project/project-list/project-item/project-item.component';
import { ProjectEditComponent } from './current-project/project-edit/project-edit.component';
import {CurrentProjectService} from './current-project/current-project.service';
import {NfacatalogListComponent} from "./nfacatalog/nfacatalog-list/nfacatalog-list.component";
import {NfacatalogService} from "./nfacatalog/nfacatalog.service";
import {NfacatalogCriteriaComponent} from "./nfacatalog/nfacatalog-criteria/nfacatalog-criteria.component";
import { StakeHolderComponent } from './current-project/stake-holder/stake-holder.component';
import { NfatemplateComponent } from './newnfa/nfatemplate/nfatemplate.component';
import { NfacatalogItemComponent } from './nfacatalog/nfacatalog-list/nfacatalog-item/nfacatalog-item.component';
import { NfacatalogCriteriaListComponent } from './nfacatalog/nfacatalog-criteria/nfacatalog-criteria-list/nfacatalog-criteria-list.component';
import { NfacatalogCriteriaItemComponent } from './nfacatalog/nfacatalog-criteria/nfacatalog-criteria-list/nfacatalog-criteria-item/nfacatalog-criteria-item.component';
import { NfacatalogMetricComponent } from './nfacatalog/nfacatalog-criteria/nfacatalog-metric/nfacatalog-metric.component';
import { NfacatalogNfaComponent } from './nfacatalog/nfacatalog-criteria/nfacatalog-nfa/nfacatalog-nfa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NfacatalogComponent,
    NewnfaComponent,
    NewpackageComponent,
    HomeComponent,
    DialogComponent,
    CurrentProjectComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectItemComponent,
    ProjectEditComponent,
    NfacatalogComponent,
    NfacatalogListComponent,
    NfacatalogCriteriaComponent,
    StakeHolderComponent,
    NfatemplateComponent,
    NfacatalogItemComponent,
    NfacatalogCriteriaListComponent,
    NfacatalogCriteriaItemComponent,
    NfacatalogMetricComponent,
    NfacatalogNfaComponent,
  ],
  imports: [
    BrowserModule,
    EditableTableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DataStorageService, CurrentProjectService, NfacatalogService],

  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
