import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { AuthComponent } from './auth/auth.component';
import { ConsoleComponent } from './console/console.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry/enquiry-list/enquiry-list.component';
import { MasterDataOverviewComponent } from './master-data/master-data-overview/master-data-overview.component';
import { MasterDataCRUDComponent } from './master-data/master-data-crud/master-data-crud.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { EnquiryCreateComponent } from './enquiry/enquiry-create/enquiry-create.component';

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
        children: [
          {
            path: '',
            component: EnquiryListComponent,
          },
          {
            path: 'create',
            component: EnquiryCreateComponent
          },
        ],
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
        children: [
          {
            path: '',
            component: ProjectListComponent,
          },
          {
            path: 'create',
            component: ProjectCreateComponent
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
