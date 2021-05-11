import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Issue } from 'src/app/models/Issue';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issue!: Issue;
  unsubscribe: Subject<void> = new Subject();

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  closeIssue(): void {
    // { : ,  }
    const data = new FormData();
    data.set('_id', this.issue._id);
    data.set('open', false);

    const projectName = this.route.snapshot.params.projectName;

    this.projectService.updateIssue(projectName, data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          console.log(result);
        } else {
          console.log('Error!');
        }
      }, error => {
        console.log(error);
      });
  }
}
