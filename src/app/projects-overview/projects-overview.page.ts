import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';
import { ProjectDetailsPage } from '../project-details/project-details.page';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.page.html',
  styleUrls: ['./projects-overview.page.scss'],
  providers: [ProjectDetailsPage]
})
export class ProjectsOverviewPage implements OnInit {
  getProjects = () => {
    return this.baseService.projects;
  }

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

    this.getUserProjects();
  }

  getUserProjects() {
    let retryCount = 0;
    let getUserProjects: Subscription;

    const retries = setInterval(() => {
      getUserProjects = this.baseService
        .getUserProjects()
        .subscribe((projects) => {
          this.baseService.projects = projects;
          if (this.getProjects()) {
            clearInterval(retries);
            getUserProjects.unsubscribe();
          }
          retryCount++;
          if (retryCount >= 30) {
            clearInterval(retries);
            getUserProjects.unsubscribe();
          }
        });
    }, 100);
  }
}
