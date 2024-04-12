import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  currentProjectName = '';
  selectedFile: any;
  getFiles = () => {
    return this.baseService.projectFiles;
  }
  getLastEditInformation = () => {
    return this.baseService.lastEditInformation;
  }

  constructor(private baseService: BaseService, private router: Router) {}

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

    this.baseService.currentProjectName = this.router.url.split('/')[4];
    this.currentProjectName = this.baseService.currentProjectName;

    this.baseService
      .getProjectInfoWithName(this.currentProjectName)
      .subscribe((project: any) => {
        this.baseService.currentProjectId = project[0].id;
      });

    this.getProjectFiles();
  }

  getProjectFiles() {
    let retryCount = 0;
    let getProjectFiles: Subscription;

    const retries = setInterval(() => {
      getProjectFiles = this.baseService
        .getProjectFiles()
        .subscribe((files) => {
          this.baseService.projectFiles = files;
          if (this.getFiles()!) {
            clearInterval(retries);
            getProjectFiles.unsubscribe();
          }
          retryCount++;
          if (retryCount >= 30) {
            clearInterval(retries);
            getProjectFiles.unsubscribe();
          }
        });
    }, 100);
  }

  showFileChanges(file: any) {
    this.baseService.selectedFile = file;
    this.baseService.getLastEditInformation(file.id).subscribe((info) => {
      this.baseService.lastEditInformation = info;
    });
  }

  hideFileChanges() {
    this.baseService.lastEditInformation = null;
  }
}
