import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { UpdateTaskStatusComponent } from '../components/update-task-status/update-task-status.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    data: { expectedRole: 'Employee' },
    children: [
      { path: 'tasks', component: TasksComponent },
      {
        path: 'createtask',
        component: CreateTaskComponent,
      },
      {
        path: 'edittask/:taskid',
        component: EditTaskComponent,
      },
      {
        path: 'updatetaskstatus/:taskid',
        component: UpdateTaskStatusComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
