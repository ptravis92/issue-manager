import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public project!: Project;
  public newIssuelink!: string;

  unsubscribe: Subject<void> = new Subject();

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const projectName = this.route.snapshot.params.projectName;
    this.projectService.getProject(projectName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(project => {
        if (project) {
          this.project = project;
          this.newIssuelink = `project/${this.project._id.projectName}/issues/add`;
          console.log(this.newIssuelink);
        } else {
          this.toastr.error('Project not found!');
        }
      }, error => {
        this.toastr.error('Project not found!');
      });
  }
}
