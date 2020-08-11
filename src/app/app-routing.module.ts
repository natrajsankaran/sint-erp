import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { ConsoleComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { MasterDataOverviewComponent } from './master-data/master-data-overview/master-data-overview.component';
import { MasterDataCRUDComponent } from './master-data/master-data-crud/master-data-crud.component';
import { ProjectListComponent } from './project-list/project-list.component';

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
            path: ':master-data-type',
            component: MasterDataCRUDComponent
          },
        ],
      },
      {
        path: 'project',
        component: ProjectListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
