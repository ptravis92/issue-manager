import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Issue } from '../models/Issue';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseURL: string = 'https://boilerplate-project-issuetracker.ptravis92.repl.co/api/issues/';
constructor(private http: HttpClient) { }

getProject(project: string): Observable<Project> {
  return this.http.get<Project>(`${this.baseURL}/${project}`)
}

addIssue(project: string, issue: Issue): Observable<any> {
  return this.http.post<Issue>(`${this.baseURL}/${project}`, issue)
  .pipe(
  );
}

updateIssue(project: string, issue: Issue): Observable<any> {
  return this.http.put<Issue>(`${this.baseURL}/${project}`, issue)
  .pipe();
}

deleteIssue(project: string, id: number): Observable<{}> {
  return this.http.delete(`${this.baseURL}/${project}`, new RequestOptions({
    // headers: headers,
    body: { id: id}
 }))
    .pipe();
}
}
