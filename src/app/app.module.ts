import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { ConsoleComponent, ConsoleMainContentComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { MasterDataOverviewComponent } from './master-data/master-data-overview/master-data-overview.component';
import { MasterDataCurrencyComponent } from './master-data/master-data-currency/master-data-currency.component';

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
    MasterDataCurrencyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
