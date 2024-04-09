import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  files: any[] = [];

  constructor(private baseService: BaseService) {}

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

    let retryCount = 0;
    let getProjectFiles: Subscription;

    const retries = setInterval(() => {
      getProjectFiles = this.baseService
        .getProjectFiles()
        .subscribe((files) => {
          this.files = files;
          if (this.files) {
            clearInterval(retries);
          }
          retryCount++;
          if (retryCount >= 30) {
            getProjectFiles.unsubscribe();
            clearInterval(retries);
          }
        });
    }, 100);
  }
}
