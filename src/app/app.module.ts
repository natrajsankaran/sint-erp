import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { ConsoleComponent, ConsoleMainContentComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry/enquiry-list/enquiry-list.component';
import { MasterDataOverviewComponent } from './master-data/master-data-overview/master-data-overview.component';
import { SharedModule } from './_shared/shared.module';
import { MasterDataCRUDComponent } from './master-data/master-data-crud/master-data-crud.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { EnquiryCreateComponent } from './enquiry/enquiry-create/enquiry-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    AuthComponent,
    ConsoleComponent,
    ConsoleMainContentComponent,
    DashboardComponent,
    EnquiryListComponent,
    MasterDataOverviewComponent,
    MasterDataCRUDComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    EnquiryCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
