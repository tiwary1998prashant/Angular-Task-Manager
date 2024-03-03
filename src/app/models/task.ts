import { Project } from './project';
import { SignUpViewModel } from './sign-up-view-model';
import { TaskStatusDetail } from './task-status-detail';

export class Task {
  taskID: number | any;
  taskName: string | any;
  description: string | any;
  createdOn: string | any;
  projectID: number | any;
  createdBy: string | any;
  assignedTo: string | any;
  taskPriorityID: number | any;
  lastUpdatedOn: number | any;
  currentStatus: number | any;
  currentTaskStatusID: number | any;

  project: Project;
  createdByUser: any;
  assignedToUser: any;
  taskStatusDetails: any;

  taskPriority: {
    taskPriorityID: number | any;
    taskPriorityName: string | any;
    // other properties if any
  };

  constructor() {
    this.taskID = null;
    this.taskName = null;
    this.description = null;
    this.createdOn = null;
    this.projectID = null;
    this.createdBy = null;
    this.assignedTo = null;
    this.taskPriorityID = null;
    this.lastUpdatedOn = null;
    this.currentStatus = null;

    this.project = new Project();
    this.createdByUser = null;
    this.assignedToUser = null;
    this.taskStatusDetails = null;
    this.taskStatusDetails = null;
    this.currentTaskStatusID = null;
    this.taskPriority = {
      taskPriorityID: null,
      taskPriorityName: null,
      // initialize other properties if any
    };
  }
}
