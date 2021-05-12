import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Issue } from 'src/app/models/Issue';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject();
  id: string = this.route.snapshot.params.id || null;
  projectName = this.route.snapshot.params.projectName;

  form = new FormGroup({
    issue_title: new FormControl(''),
    issue_text: new FormControl(''),
    created_by: new FormControl(''),
    assigned_to: new FormControl(''),
    status_text: new FormControl('')
  });

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.getIssue();
    }
  }

  getIssue(): void {
    this.projectService.getProject(this.projectName)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(project => {
        if (project) {
          const issue: Issue | null = project.projectIssues.find(x => x._id === this.id) || null;
          if (issue) { this.form.patchValue(issue); }
        } else {
          this.toastr.error('Issue not found!');
        }
      }, error => {
        this.toastr.error(error);
      });
  }

  addIssue(): void {
    this.projectService.addIssue(this.projectName, this.form.value as Issue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          this.router.navigate([`/project/${this.projectName}`]).then(() => {
            this.toastr.success('Issue Added!');
          });
        } else {
          this.toastr.error('Error!');
        }
      }, error => {
        this.toastr.error(error);
      });
  }

  updateIssue(): void {
    const form = this.form.value;
    const data = new HttpParams()
      .set('_id', this.id)
      .set('issue_title', form.issue_title)
      .set('issue_text', form.issue_text)
      .set('created_by', form.created_by)
      .set('assigned_to', form.assigned_to)
      .set('status_text', form.status_text);
    this.projectService.updateIssue(this.projectName, data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          this.router.navigate([`/project/${this.projectName}`]).then(() => {
            this.toastr.success(result);
          });
        } else {
          this.toastr.error('Error!');
        }
      }, error => {
        this.toastr.error(error);
      });
  }
}
