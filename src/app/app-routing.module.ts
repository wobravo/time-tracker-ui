import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { ProjectManagementComponent } from './modules/project-management/pages/project-management.component';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';

const routes: Routes = [
  {path: 'reports', component: ReportsComponent},
  {path: 'time-clock', component: TimeClockComponent},
  {path: 'time-entries', component: TimeEntriesComponent},
  {path: 'project-management', component: ProjectManagementComponent},
  {path: 'activities-management', component: ActivitiesManagementComponent},
  {path: '', pathMatch: 'full', redirectTo: 'time-clock'},
  {path: '**', pathMatch: 'full', redirectTo: 'time-clock'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
