import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';
import { ProjectsOverviewPage } from '../projects-overview/projects-overview.page';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
  providers: [ProjectsOverviewPage],
})
export class CreateProjectPage implements OnInit {
  fieldData = {
    projectName: {
      value: '',
    },
    userSearch: {
      value: '',
    },
  };
  users: any[] = [];

  constructor(private projectsOverview: ProjectsOverviewPage, private baseService: BaseService, private router: Router) {}

  ngOnInit() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('themevalue: string, value: string' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  addUser() {
    this.users.push(this.fieldData.userSearch.value);
  }

  createProject() {
    this.baseService
      .createProject(this.fieldData.projectName.value, this.users)
      .subscribe((project: any) => {
        this.projectsOverview.getUserProjects();
        this.router.navigate([`/tabs/projects/details/${project.name}`]);
      });
  }
}
