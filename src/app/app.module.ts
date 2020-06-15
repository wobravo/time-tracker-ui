import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {CommonModule, DatePipe} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { UserComponent } from './modules/shared/components/user/user.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { ClockComponent } from './modules/shared/components/clock/clock.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { DetailsFieldsComponent } from './modules/shared/components/details-fields/details-fields.component';
import { ProjectListHoverComponent } from './modules/time-clock/components/project-list-hover/project-list-hover.component';
import { MonthPickerComponent } from './modules/shared/components/month-picker/month-picker.component';
import { EmptyStateComponent } from './modules/shared/components/empty-state/empty-state.component';
import { GroupByDatePipe } from './modules/shared/pipes/group-by-date/group-by-date.pipe';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { ActivityListComponent } from './modules/activities-management/components/activity-list/activity-list.component';
import { CreateActivityComponent } from './modules/activities-management/components/create-activity/create-activity.component';
import { FilterProjectPipe } from './modules/shared/pipes/filter-project/filter-project.pipe';
import { SearchComponent } from './modules/shared/components/search/search.component';
import { EntryFieldsComponent } from './modules/time-clock/components/entry-fields/entry-fields.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ActivityEffects } from './modules/activities-management/store/activity-management.effects';
import { ProjectEffects } from './modules/customer-management/components/projects/components/store/project.effects';
import { TechnologyEffects } from './modules/shared/store/technology.effects';
import { ProjectTypeEffects } from './modules/customer-management/components/projects-type/store/project-type.effects';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { CustomerComponent } from './modules/customer-management/pages/customer.component';
// tslint:disable-next-line: max-line-length
import { CustomerListComponent } from './modules/customer-management/components/customer-info/components/customer-list/customer-list.component';
// tslint:disable-next-line: max-line-length
import { ManagementCustomerProjectsComponent } from './modules/customer-management/components/management-customer-projects/management-customer-projects.component';
import { CreateCustomerComponent } from './modules/customer-management/components/customer-info/components/create-customer/create-customer';
// tslint:disable-next-line: max-line-length
import { CreateProjectComponent } from './modules/customer-management/components/projects/components/create-project/create-project.component';
import { ProjectListComponent } from './modules/customer-management/components/projects/components/project-list/project-list.component';
// tslint:disable-next-line: max-line-length
import { ProjectTypeListComponent } from './modules/customer-management/components/projects-type/components/project-type-list/project-type-list.component';
// tslint:disable-next-line: max-line-length
import { CreateProjectTypeComponent } from './modules/customer-management/components/projects-type/components/create-project-type/create-project-type.component';
import { CustomerEffects } from './modules/customer-management/store/customer-management.effects';
import { EntryEffects } from './modules/time-clock/store/entry.effects';
import { InjectTokenInterceptor } from './modules/shared/interceptors/inject.token.interceptor';
import { SubstractDatePipe } from './modules/shared/pipes/substract-date/substract-date.pipe';
import {TechnologiesComponent} from './modules/shared/components/technologies/technologies.component';
import { TimeEntriesSummaryComponent } from './modules/time-clock/components/time-entries-summary/time-entries-summary.component';
import { TimeDetailsPipe } from './modules/time-clock/pipes/time-details.pipe';
import {InputLabelComponent} from './modules/shared/components/input-label/input-label.component';
import {ReportsComponent} from './modules/reports/pages/reports.component';
import {InputDateComponent} from './modules/shared/components/input-date/input-date.component';
import {TimeRangeFormComponent} from './modules/reports/components/time-range-form/time-range-form.component';
import {TimeEntriesTableComponent} from './modules/reports/components/time-entries-table/time-entries-table.component';
import { DialogComponent } from './modules/shared/components/dialog/dialog.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    TimeClockComponent,
    CreateProjectComponent,
    TimeClockComponent,
    DetailsFieldsComponent,
    ProjectListHoverComponent,
    TimeEntriesComponent,
    MonthPickerComponent,
    EmptyStateComponent,
    GroupByDatePipe,
    ActivitiesManagementComponent,
    CreateActivityComponent,
    ActivityListComponent,
    HomeComponent,
    LoginComponent,
    FilterProjectPipe,
    SearchComponent,
    CustomerComponent,
    CustomerListComponent,
    ManagementCustomerProjectsComponent,
    CreateCustomerComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectTypeListComponent,
    CreateProjectTypeComponent,
    EntryFieldsComponent,
    SubstractDatePipe,
    TechnologiesComponent,
    TimeEntriesSummaryComponent,
    TimeDetailsPipe,
    InputLabelComponent,
    ReportsComponent,
    InputDateComponent,
    TimeRangeFormComponent,
    TimeEntriesTableComponent,
    DialogComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DataTablesModule,
    AutocompleteLibModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 15, // Retains last 15 states
        })
      : [],
    EffectsModule.forRoot([
      ProjectEffects,
      ActivityEffects,
      CustomerEffects,
      TechnologyEffects,
      ProjectTypeEffects,
      EntryEffects,
    ]),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectTokenInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
