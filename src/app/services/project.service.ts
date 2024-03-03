import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  urlPrefix: string = 'http://localhost:9090';

  constructor(private httpClient: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.urlPrefix + '/api/projects', {
      responseType: 'json',
    });
  }

  getProjectByProjectID(ProjectID: number): Observable<Project> {
    return this.httpClient.get<Project>(
      this.urlPrefix + '/api/projects/searchbyprojectid/' + ProjectID,
      { responseType: 'json' }
    );
  }

  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>(
      this.urlPrefix + '/api/projects',
      newProject,
      {
        responseType: 'json',
      }
    );
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(
      this.urlPrefix + '/api/projects',
      existingProject,
      { responseType: 'json' }
    );
  }
  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>(
      this.urlPrefix + '/api/projects?ProjectID=' + ProjectID
    );
  }

  getAllEmployee() {
    return this.httpClient.get(this.urlPrefix + '/api/employees', {
      responseType: 'json',
    });
  }
}
