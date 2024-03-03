import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  routeParamSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.routeParamSubscription = this.activatedRoute.params.subscribe(
      (param) => {
        let projectId = param['projectid'];
        this.projectService.getProjectByProjectID(projectId).subscribe({
          next: (response) => {
            this.project = response;
          },
        });
      }
    );
  }
  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }
}
