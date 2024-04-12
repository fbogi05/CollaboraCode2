import { Component, Input, OnInit } from '@angular/core';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';

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
    this.router.navigate(['/tabs/projects/file-settings']);
  }

  hideFileChanges() {
    this.projectDetails.selectedFile = null;
    this.projectDetails.hideFileChanges();
  }
}
