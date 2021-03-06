import { AdminGuard } from './guards/admin-guard/admin-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './guards/login-guard/login.guard';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { CustomerComponent } from './modules/customer-management/pages/customer.component';
import { UsersComponent } from './modules/users/pages/users.component';
import { TechnologyReportComponent } from './modules/technology-report/pages/technology-report.component';
import { TechnologiesReportGuard } from './guards/technologies-report-guard/technologies-report.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'reports', canActivate: [AdminGuard], component: ReportsComponent },
      { path: 'time-clock', component: TimeClockComponent },
      { path: 'time-entries', component: TimeEntriesComponent },
      { path: 'activities-management', component: ActivitiesManagementComponent },
      { path: 'customers-management', canActivate: [AdminGuard], component: CustomerComponent },
      { path: 'users', canActivate: [AdminGuard], component: UsersComponent },
      { path: 'technology-report', canActivate: [AdminGuard, TechnologiesReportGuard], component: TechnologyReportComponent},
      { path: '', pathMatch: 'full', redirectTo: 'time-clock' },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
