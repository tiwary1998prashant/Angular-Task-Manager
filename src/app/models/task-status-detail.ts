import { TaskStatus } from './task-status';

export class TaskStatusDetail {
  taskStatusDetailID: number | any;
  taskID: number | any;
  taskStatusID: number | any;
  userID: string | any;
  description: string | any;
  taskstatus: TaskStatus | any;
  user: any;
  statsUpdationDateTimeString: string | any;

  constructor() {
    this.taskStatusDetailID = null;
    this.taskID = null;
    this.taskStatusID = null;
    this.description = null;
    this.userID = null;
    this.taskstatus = null;
    this.user = null;
    this.statsUpdationDateTimeString = null;
  }
}
