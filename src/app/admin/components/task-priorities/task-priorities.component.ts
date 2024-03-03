import { Component, Renderer2, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskPriority } from 'src/app/models/task-priority';
import { TaskPrioritiesService } from 'src/app/services/task-priorities.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss'],
})
export class TaskPrioritiesComponent {
  taskPriorities: TaskPriority[] = [];
  showLoading = true;

  deleteTaskPriority: TaskPriority = new TaskPriority();
  editIndex!: number;
  deleteIndex!: number;

  searchBy: string = 'taskPriorityName';
  searchText: string = '';

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  newForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private taskPrioritiesService: TaskPrioritiesService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadData();
    this.initializeForms();
  }

  loadData() {
    this.taskPrioritiesService
      .getTaskPriorities()
      .subscribe((response: TaskPriority[]) => {
        this.taskPriorities = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      });
  }

  initializeForms() {
    this.newForm = this.formBuilder.group({
      taskPriorityID: [null],
      taskPriorityName: [null, [Validators.required]],
    });

    this.editForm = this.formBuilder.group({
      taskPriorityID: [null],
      taskPriorityName: [null, [Validators.required]],
    });
  }

  calculateNoOfPages() {
    const filterPipe = new FilterPipe();
    const filteredClientLocations = filterPipe.transform(
      this.taskPriorities,
      this.searchBy,
      this.searchText
    );
    const noOfPages = Math.ceil(filteredClientLocations.length / this.pageSize);

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

  onNewClick(addTaskPriorityModal: TemplateRef<any>) {
    this.newForm.reset();
    this.modalService.open(addTaskPriorityModal);
    this.focusOnElement('#taskPriorityName');
  }

  onSaveClick() {
    this.taskPrioritiesService
      .insertTaskPriority(this.newForm.value)
      .subscribe({
        next: (response: TaskPriority) => {
          const newTaskPriority: TaskPriority = { ...response };
          this.taskPriorities.push(newTaskPriority);
          this.calculateNoOfPages();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onEditClick(taskPriority: TaskPriority, editModal: TemplateRef<any>) {
    this.modalService.open(editModal);
    this.renderer.selectRootElement('#taskPriorityName').focus();
    this.editForm.patchValue(taskPriority);
    this.editIndex = this.taskPriorities.indexOf(taskPriority);
  }

  onUpdateClick() {
    this.taskPrioritiesService
      .updateTaskPriority(this.editForm.value)
      .subscribe({
        next: (response: TaskPriority) => {
          this.taskPriorities[this.editIndex] = { ...response };
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onDeleteClick(taskPriority: TaskPriority, deleteModal: TemplateRef<any>) {
    this.modalService.open(deleteModal);
    this.deleteTaskPriority = { ...taskPriority };
    this.deleteIndex = this.taskPriorities.indexOf(taskPriority);
  }

  onDeleteConfirmClick() {
    this.taskPrioritiesService
      .deleteTaskPriority(this.deleteTaskPriority.taskPriorityID)
      .subscribe({
        next: () => {
          this.taskPriorities.splice(this.deleteIndex, 1);
          this.deleteTaskPriority = new TaskPriority(); // Clear deleteTaskPriority
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
