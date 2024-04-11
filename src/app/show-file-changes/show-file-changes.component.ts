import { Component, Input, OnInit } from '@angular/core';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';

@Component({
  selector: 'app-show-file-changes',
  templateUrl: './show-file-changes.component.html',
  styleUrls: ['./show-file-changes.component.scss'],
  providers: [HungarianDatePipe],
})
export class ShowFileChangesComponent implements OnInit {
  @Input() lastEditInformation: any;

  constructor(private projectDetails: ProjectDetailsPage, private datePipe: HungarianDatePipe) {}

  ngOnInit() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.lastEditInformation.lastEditedTime = this.datePipe.transform(this.lastEditInformation.lastEditedTime);
  }

  hideFileChanges() {
    this.projectDetails.hideFileChanges();
  }
}
