import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.page.html',
  styleUrls: ['./projects-overview.page.scss'],
})
export class ProjectsOverviewPage implements OnInit {
  projects: any = [];

  constructor(private baseService: BaseService, private router: Router) {
    this.projects = this.baseService.getProjects();
  }

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
  }

  addProject() {
    this.baseService.addProject();
    this.projects = this.baseService.getProjects();
    this.router.navigate([
      `/tabs/projects/create`,
    ]);
  }
}
