import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
  { path: 'project/:projectName', pathMatch: 'full', component: ProjectComponent },
];
