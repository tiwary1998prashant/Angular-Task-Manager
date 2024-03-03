import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { LoginService } from '../../../services/login.service';
import { GroupedTask } from '../../../models/grouped-task';
import { SignUpViewModel } from 'src/app/models/sign-up-view-model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskGroups!: GroupedTask[];


  constructor(
    private tasksService: TasksService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
      console.log(this.taskGroups)
    });
  }

  getTaskGroupBgCssClass(taskStatusName: any): any {
    var className;
    switch (taskStatusName) {
      case 'Holding':
        className = 'bg-secondary text-white';
        break;
      case 'Prioritized':
        className = 'bg-primary text-white';
        break;
      case 'Started':
        className = 'bg-info text-white';
        break;
      case 'Finished':
        className = 'bg-success text-white';
        break;
      case 'Reverted':
        className = 'bg-danger text-white';
        break;
    }
    return className;
  }

  getTaskPriorityBadgeCssClass(taskPriorityName: string): any {
    var className;
    switch (taskPriorityName) {
      case 'Urgent':
        className = 'text-bg-danger';
        break;
      case 'Normal':
        className = 'text-bg-primary';
        break;
      case 'Below Normal':
        className = 'text-bg-info';
        break;
      case 'Low':
        className = 'text-bg-secondary';
        break;
    }
    return className;
  }

  getTaskGroupTextCssClass(taskStatusName: string): any {
    var className;
    switch (taskStatusName) {
      case 'Holding':
        className = 'text-secondary';
        break;
      case 'Prioritized':
        className = 'text-primary';
        break;
      case 'Started':
        className = 'text-info';
        break;
      case 'Finished':
        className = 'text-success';
        break;
      case 'Reverted':
        className = 'text-danger';
        break;
    }
    return className;
  }
}
