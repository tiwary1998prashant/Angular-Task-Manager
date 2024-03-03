import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { CheckboxPrinterComponent } from './components/checkbox-printer/checkbox-printer.component';
import { ClientLocationsComponent } from './components/client-locations/client-locations.component';
import { CountriesComponent } from './components/countries/countries.component';
import { TaskPrioritiesComponent } from './components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { TeamSizeValidatorDirective } from './directives/team-size-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MastersComponent } from './components/masters/masters.component';
import { ProjectIduniqueValidatorDirective } from './directives/project-idunique-validator.directive';
import { ClientLocationStatusValidatorDirective } from './directives/client-location-status-validator.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { PagingPipe } from './pipes/paging.pipe';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckboxPrinterComponent,
    MastersComponent,
    ClientLocationsComponent,
    CountriesComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    TeamSizeValidatorDirective,
    ProjectIduniqueValidatorDirective,
    ClientLocationStatusValidatorDirective,
    FilterPipe,
    PagingPipe,
    ProjectDetailsComponent,



  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AdminModule { }
