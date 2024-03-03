import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private httpClient: HttpClient) {}

  public getAllEmployes(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:9090/api/getallemployees',
      { responseType: 'json' }
    );
  }
}
