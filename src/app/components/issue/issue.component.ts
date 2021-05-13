import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Issue } from 'src/app/models/Issue';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {
  @Input() issue!: Issue;
  public unsubscribe: Subject<void> = new Subject();
  public projectName = this.route.snapshot.params.projectName;
  public show = true;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  closeIssue(): void {
    const data = new HttpParams()
      .set('_id', this.issue._id)
      .set('open', 'false');

    this.projectService.updateIssue(this.projectName, data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          this.issue.open = false;
          this.toastr.success(result);
        } else {
          this.toastr.error('Error!');
        }
      }, error => {
        this.toastr.error(error);
      });
  }

  deleteIssue(): void {
    this.projectService.deleteIssue(this.projectName, this.issue._id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          this.show = false;
          this.toastr.success(result);
        } else {
          this.toastr.error('Error!');
        }
      }, error => {
        this.toastr.error(error);
      });
  }

  editIssue(): void {
    // const editRoute = this.router.config.find(r => r.path === `project/${this.projectName}/issues/edit`);
    // editRoute.data = { issue: this.issue };
    this.router.navigateByUrl(`project/${this.projectName}/issues/edit/${this.issue._id}`);
  }
}
