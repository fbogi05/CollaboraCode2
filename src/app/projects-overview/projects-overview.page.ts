import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.page.html',
  styleUrls: ['./projects-overview.page.scss'],
})
export class ProjectsOverviewPage implements OnInit {
  getOwnedProjects = () => {
    return this.baseService.projects.owns;
  };
  getMemberOfProjects = () => {
    return this.baseService.projects.memberOf;
  };
  getProjectsLength = () => {
    return (
      this.baseService.projects.owns?.length +
      this.baseService.projects.memberOf?.length
    );
  };

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

    const retries = setInterval(async () => {
      getUserProjects = (await this.baseService.getUserProjects()).subscribe(
        (projects: any) => {
          this.baseService.projects = projects;
          if (this.baseService.projects) {
            clearInterval(retries);
            getUserProjects.unsubscribe();
          }
          retryCount++;
          if (retryCount >= 30) {
            clearInterval(retries);
            getUserProjects.unsubscribe();
          }
        }
      );
    }, 100);
  }
}
