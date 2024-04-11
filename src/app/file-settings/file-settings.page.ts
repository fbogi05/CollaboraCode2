import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-settings',
  templateUrl: './file-settings.page.html',
  styleUrls: ['./file-settings.page.scss'],
  providers: [ProjectDetailsPage],
})
export class FileSettingsPage implements OnInit {
  fieldData = {
    fileName: {
      value: '',
    },
  };
  file: any;
  currentProjectName: string = this.baseService.currentProjectName!;

  constructor(private baseService: BaseService, private router: Router, private projectDetails: ProjectDetailsPage) {}

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
    this.currentProjectName = this.router.url.split('/')[4];

    if (this.file.name) {
      this.baseService
        .getFileInfoWithName(this.file.name)
        .subscribe((fileData: any) => {
          console.log(fileData);
          this.fieldData.fileName.value = fileData.fileName;
          this.file.id = fileData.id;
        });
    }
    
  }

  updateFile() {
    if (this.file.id) {
      this.baseService
        .updateFile(this.file.id, this.fieldData.fileName.value)
        .subscribe((fileData: any) => {
          console.log(fileData);
          
        });
    }
  }

  deleteFile() {
    if (this.file.id) {
      this.baseService.deleteFile(this.file.id).subscribe();
    }
  }
}
