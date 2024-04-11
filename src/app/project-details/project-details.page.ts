import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FileCardComponent } from '../file-card/file-card.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  getSelectedFile() {
    throw new Error('Method not implemented.');
  }

  files: any[] = [];
  currentProjectName = '';
  lastEditInformation: any;

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

    this.currentProjectName = this.router.url.split('/')[4];

    this.baseService
      .getProjectInfoWithName(this.currentProjectName)
      .subscribe((project: any) => {
        this.baseService.currentProjectId = project[0].id;
      });

    let retryCount = 0;
    let getProjectFiles: Subscription;

    const retries = setInterval(() => {
      getProjectFiles = this.baseService
        .getProjectFiles()
        .subscribe((files) => {
          this.files = files;
          if (this.files) {
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
    this.lastEditInformation;
    this.baseService.getLastEditInformation(file.id).subscribe((info) => {
      this.lastEditInformation = info;
    });
  }

  hideFileChanges() {
    this.lastEditInformation = null;
  }
}
