import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { SignUpViewModel } from 'src/app/models/sign-up-view-model';
import { TaskPriority } from 'src/app/models/task-priority';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskPrioritiesService } from 'src/app/services/task-priorities.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  projects!: Observable<Project[]>;
  employees!: Observable<any>;
  taskPriorities!: Observable<TaskPriority[]>;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private projectsService: ProjectService,
    private taskPrioritiesService: TaskPrioritiesService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.newTaskForm = new FormGroup({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
      taskPriorityID: new FormControl(2, [Validators.required]),
    });

    this.projects = this.projectsService.getAllProjects();

    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
    this.employees = this.employeesService.getAllEmployes();
  }

  onCreateTaskClick(event: any) {
    this.tasksService.insertTask(this.newTaskForm.value).subscribe({
      next: () => {
        this.router.navigate(['/employee', 'tasks']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
