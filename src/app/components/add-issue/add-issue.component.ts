import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Issue } from 'src/app/models/Issue';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject();

  form = new FormGroup({
    issue_title: new FormControl(''),
    issue_text: new FormControl(''),
    created_by: new FormControl(''),
    assigned_to: new FormControl(''),
    status_text: new FormControl('')
  });

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addIssue(): void {
    const projectName = this.route.snapshot.params.projectName;
    console.log(this.form.value as Issue);
    this.projectService.addIssue(projectName, this.form.value as Issue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        if (result) {
          console.log(result);
        } else {
          console.log('Error!');
        }
      }, error => {
        console.log('Error!');
      });
  }

}
