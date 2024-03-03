import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { GroupedTask } from '../models/grouped-task';
import { HttpClient } from '@angular/common/http';
import { TaskStatusDetail } from '../models/task-status-detail';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<GroupedTask[]> {
    return this.httpClient.get<GroupedTask[]>(
      'http://localhost:9090/api/tasks',
      { responseType: 'json' }
    );
  }

  getTaskByTaskID(TaskID: number): Observable<Task> {
    return this.httpClient.get<Task>(
      'http://localhost:9090/api/tasks/searchbytaskid/' + TaskID,
      { responseType: 'json' }
    );
  }

  updateTaskStatus(
    taskStatusDetail: TaskStatusDetail
  ): Observable<TaskStatusDetail> {
    var user = JSON.parse(sessionStorage['currentUser']);
    //console.log(user);
    taskStatusDetail.userID = user.id; //add this statement to store the current user's id in the 'taskStatusDetails' table

    return this.httpClient.put<TaskStatusDetail>(
      'http://localhost:9090/api/updatetaskstatus',
      taskStatusDetail,
      { responseType: 'json' }
    );
  }

  insertTask(newTask: Task): Observable<Task> {
    var user = JSON.parse(sessionStorage['currentUser']);
    newTask.createdBy = user.id; //add this statement to store the current user's id in the 'tasks' table

    return this.httpClient.post<Task>(
      'http://localhost:9090/api/createtask',
      newTask,
      { responseType: 'json' }
    );
  }
}
