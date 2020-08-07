import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { ConsoleComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { MasterDataOverviewComponent } from './master-data/master-data-overview/master-data-overview.component';
import { MasterDataCurrencyComponent } from './master-data/master-data-currency/master-data-currency.component';

const routes: Routes = [
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'console',
    component: ConsoleComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'enquiry',
        component: EnquiryListComponent,
      },
      {
        path: 'master-data',
        children: [
          {
            path: 'overview',
            component: MasterDataOverviewComponent
          },
          {
            path: 'currencies',
            component: MasterDataCurrencyComponent
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
