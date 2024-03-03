import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { MastersComponent } from '../components/masters/masters.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    data: { expectedRole: 'Admin' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/view/:projectid', component: ProjectDetailsComponent },
      { path: 'masters', component: MastersComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
