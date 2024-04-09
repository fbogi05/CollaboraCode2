import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.page.html',
  styleUrls: ['./projects-overview.page.scss'],
})
export class ProjectsOverviewPage implements OnInit {
  projects: any[] = [];

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
    let getUserProjects: Subscription;

    const retries = setInterval(() => {
      getUserProjects = this.baseService
        .getUserProjects()
        .subscribe((projects) => {
          this.projects = projects;
          if (this.projects) {
            getUserProjects.unsubscribe();
            clearInterval(retries);
          }
          retryCount++;
          if (retryCount >= 30) {
            getUserProjects.unsubscribe();
            clearInterval(retries);
          }
        });
    }, 100);
  }
}
