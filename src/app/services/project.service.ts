import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issue } from '../models/Issue';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseURL = 'https://boilerplate-project-issuetracker.ptravis92.repl.co/api/issues';
  constructor(private http: HttpClient) { }

  getProject(project: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseURL}/${project}`);
  }

  addIssue(project: string, issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseURL}/${project}`, issue);
  }

  updateIssue(project: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${project}`, data, { responseType: 'text' as 'json' });
  }

  deleteIssue(project: string, id: string): Observable<any> {

    const data = new HttpParams()
      .set('_id', id);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'text' as 'json', body: data
    };



    return this.http.delete(`${this.baseURL}/${project}`, httpOptions);
  }
}
