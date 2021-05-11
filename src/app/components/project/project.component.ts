import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public project!: Project;

  unsubscribe: Subject<void> = new Subject();

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject();
  }

  getProject(): void {
    const projectName = this.route.snapshot.params['projectName'];
    this.projectService.getProject(projectName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(project => {
        if (project) {
          this.project = project;
          console.log(project);
        } else {
          console.log('Project not found!');
        }
      }, error => {
        console.log('Project not found!');
      })
  }
}
