import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { Router } from '@angular/router';
import { ShowFileChangesComponent } from '../show-file-changes/show-file-changes.component';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';

@Component({
  selector: 'app-file-settings',
  templateUrl: './file-settings.page.html',
  styleUrls: ['./file-settings.page.scss'],
  providers: [ProjectDetailsPage, ShowFileChangesComponent, HungarianDatePipe],
})
export class FileSettingsPage implements OnInit {
  fieldData = {
    fileName: {
      value: '',
    },
  };
  file: any = this.baseService.selectedFile;
  currentProjectName: string = this.baseService.currentProjectName;

  constructor(
    private projectDetails: ProjectDetailsPage,
    private showFileChanges: ShowFileChangesComponent,
    private baseService: BaseService,
    private router: Router
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

    this.setFieldValues();
  }

  setFieldValues() {
    if (this.file.name) {
      this.baseService
        .getFileInfoWithName(this.file.name)
        .subscribe((fileData: any) => {
          this.fieldData.fileName.value = fileData[0].name;
        });
    }
  }

  updateFile() {
    if (this.file.id) {
      this.baseService
        .updateFile(this.file.id, this.fieldData.fileName.value)
        .subscribe();
    }
  }

  deleteFile() {
    if (this.file.id) {
      this.baseService.deleteFile(this.file.id).subscribe(() => {
        this.projectDetails.hideFileChanges();
        this.projectDetails.getProjectFiles();
        this.router.navigate([
          '/tabs/projects/details',
          this.currentProjectName,
        ]);
      });
    }
  }

  goBack() {    
    this.projectDetails.hideFileChanges();
    this.projectDetails.getProjectFiles();
    this.router.navigate(['/tabs/projects/details', this.currentProjectName]);
  }
}
