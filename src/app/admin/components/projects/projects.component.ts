import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientLocation } from 'src/app/models/client-location';
import { Project } from 'src/app/models/project';
import { ClientLocationsService } from 'src/app/services/client-locations.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectComponent } from '../project/project.component';
import { FormGroup } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];
  clientLocations: ClientLocation[] = [];

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex!: number;
  deleteProject: Project = new Project();
  deleteIndex!: number;
  hideDetails!: boolean;
  @ViewChild('newForm', { static: false }) createForm!: FormGroup | any;
  //@ViewChild('pID') pID!: ElementRef;
  searchBy: string = 'projectName';
  searchText: string = '';

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;

  constructor(
    private projectService: ProjectService,
    private clientLocationsService: ClientLocationsService,
    private ngbModalService: NgbModal,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projects = response;
        this.calculateNoOfPages();
      },
      error: (error) => {
        console.log('projects api not working ');
      },
    });
    this.clientLocationsService.getClientLocations().subscribe({
      next: (response) => {
        this.clientLocations = response;
      },
    });
  }

  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(
      this.projects,
      this.searchBy,
      this.searchText
    );
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  onProjectCreate(newProjectModal: TemplateRef<any>) {
    this.newProject = new Project();
    this.ngbModalService.open(newProjectModal);
    this.renderer.selectRootElement('#newProjectID').focus();
    //this.pID.nativeElement.focus();
  }
  onSaveClick() {
    this.newProject.clientLocation = this.clientLocations.filter(
      (clientLocation) =>
        clientLocation.clientLocationID == this.newProject.clientLocationID
    )[0];

    this.projectService.insertProject(this.newProject).subscribe({
      next: (response: Project) => {
        next: () => {
          this.projects.push({ ...response });
          this.newProject = new Project();
          this.calculateNoOfPages();
        };
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  onEditClicked(editprojectModal: TemplateRef<any>, index: number) {
    this.ngbModalService.open(editprojectModal);
    this.renderer.selectRootElement('#editProjectName').focus();
    const project = this.projects[index];
    const formattedDate = project.dateOfStart.split('/').reverse().join('-');
    this.editProject = { ...project, dateOfStart: formattedDate };
    this.editIndex = index;
  }
  onUpdateClick() {
    this.projectService.updateProject(this.editProject).subscribe({
      next: (response) => {
        this.projects[this.editIndex] = { ...response };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onDeleteClicked(deleteProjectModal: TemplateRef<any>, index: number) {
    this.ngbModalService.open(deleteProjectModal);
    this.deleteIndex = index;
    this.deleteProject = { ...this.projects[index] };
  }
  onDeleteConfirm() {
    const projectIdToDelete = this.deleteProject.projectID;
    if (projectIdToDelete) {
      this.projectService
        .deleteProject(this.deleteProject.projectID)
        .subscribe({
          next: (response) => {
            this.projects.splice(this.deleteIndex, 1);
            this.deleteProject = new Project();
            this.calculateNoOfPages();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  @ViewChildren('prj') prj!: QueryList<ProjectComponent>;

  onSelectClcik() {
    let prjs = this.prj.toArray();
    for (let i = 0; i < prjs.length; i++) {
      prjs[i].onSelect();
    }
  }

  onHideShowChange() {
    let prjs = this.prj.toArray();
    for (let i = 0; i < prjs.length; i++) {
      prjs[i].hideDetails = this.hideDetails;
    }
  }
  onSearchTextKeyup($event: any) {
    this.calculateNoOfPages();
  }
  onPageIndexClicked(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }
}
