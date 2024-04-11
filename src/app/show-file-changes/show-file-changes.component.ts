import { Component, Input, OnInit } from '@angular/core';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-file-changes',
  templateUrl: './show-file-changes.component.html',
  styleUrls: ['./show-file-changes.component.scss'],
  providers: [HungarianDatePipe],
})
export class ShowFileChangesComponent implements OnInit {
  @Input() lastEditInformation: any;
  @Input() currentProjectName?: string;

  constructor(
    private router: Router,
    private projectDetails: ProjectDetailsPage,
    private datePipe: HungarianDatePipe
  ) {}

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

    this.lastEditInformation.lastEditedTime = this.datePipe.transform(
      this.lastEditInformation.lastEditedTime
    );
  }

  openFileSettings() {
    this.router.navigate(['/tabs/projects/details/' + this.currentProjectName + '/file-settings']);
  }

  hideFileChanges() {
    this.projectDetails.hideFileChanges();
  }
}
