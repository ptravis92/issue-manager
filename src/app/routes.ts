import { Routes, RouterModule } from '@angular/router';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
  { path: 'project/:projectName', pathMatch: 'full', component: ProjectComponent },
  { path: 'project/:projectName/issues/add', pathMatch: 'full', component: AddIssueComponent },
  { path: 'project/:projectName/issues/edit/:id', pathMatch: 'full', component: AddIssueComponent}
];
