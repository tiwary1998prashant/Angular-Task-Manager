import { Component, Renderer2, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskStatus } from 'src/app/models/task-status';
import { TaskStatusService } from 'src/app/services/task-status.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss'],
})
export class TaskStatusComponent {
  taskStatuses: TaskStatus[] = [];
  showLoading = true;

  deleteTaskStatus: TaskStatus = new TaskStatus();
  editIndex!: number;
  deleteIndex!: number;

  searchBy: string = 'taskStatusName';
  searchText: string = '';

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  newForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private taskStatusService: TaskStatusService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadData();
    this.initializeForms();
  }

  loadData() {
    this.taskStatusService
      .getTaskStatuses()
      .subscribe((response: TaskStatus[]) => {
        this.taskStatuses = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      });
  }

  initializeForms() {
    this.newForm = this.formBuilder.group({
      taskStatusID: [null],
      taskStatusName: [null, [Validators.required]],
    });

    this.editForm = this.formBuilder.group({
      taskStatusID: [null],
      taskStatusName: [null, [Validators.required]],
    });
  }

  calculateNoOfPages() {
    const filterPipe = new FilterPipe();
    const filteredTaskStatuses = filterPipe.transform(
      this.taskStatuses,
      this.searchBy,
      this.searchText
    );
    const noOfPages = Math.ceil(filteredTaskStatuses.length / this.pageSize);

    this.pages = Array.from({ length: noOfPages }, (_, i) => ({
      pageIndex: i,
    }));
    this.currentPageIndex = 0;
  }

  onPageIndexClicked(ind: number) {
    if (ind >= 0 && ind < this.pages.length) {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(addTaskStatusModal: TemplateRef<any>) {
    this.newForm.reset();
    this.modalService.open(addTaskStatusModal);
    this.focusOnElement('#taskStatusName');
  }

  onSaveClick() {
    this.taskStatusService.insertTaskStatus(this.newForm.value).subscribe({
      next: (response: TaskStatus) => {
        const newTaskStatus: TaskStatus = { ...response };
        this.taskStatuses.push(newTaskStatus);
        this.calculateNoOfPages();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEditClick(taskStatus: TaskStatus, editModal: TemplateRef<any>) {
    this.modalService.open(editModal);
    this.renderer.selectRootElement('#taskStatusName').focus();
    this.editForm.patchValue(taskStatus);
    this.editIndex = this.taskStatuses.indexOf(taskStatus);
  }

  onUpdateClick() {
    this.taskStatusService.updateTaskStatus(this.editForm.value).subscribe({
      next: (response: TaskStatus) => {
        this.taskStatuses[this.editIndex] = { ...response };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onDeleteClick(taskStatus: TaskStatus, deleteModal: TemplateRef<any>) {
    this.modalService.open(deleteModal);
    this.deleteTaskStatus = { ...taskStatus };
    this.deleteIndex = this.taskStatuses.indexOf(taskStatus);
  }

  onDeleteConfirmClick() {
    this.taskStatusService
      .deleteTaskStatus(this.deleteTaskStatus.taskStatusID)
      .subscribe({
        next: () => {
          this.taskStatuses.splice(this.deleteIndex, 1);
          this.deleteTaskStatus = new TaskStatus(); // Clear deleteTaskStatus
          this.calculateNoOfPages();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onSearchTextChange() {
    this.calculateNoOfPages();
  }

  private focusOnElement(elementId: string) {
    this.renderer.selectRootElement(elementId).focus();
  }
}
