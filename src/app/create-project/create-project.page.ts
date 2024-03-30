import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  fieldData = {
    projectName: {
      value: '',
    },
    userSearch: {
      value: '',
    }
  };

  constructor(private baseService: BaseService, private router: Router) {}

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

  createProject() {
    this.baseService.createProject(this.fieldData.projectName.value, this.fieldData.userSearch.value);
    this.router.navigate([`/tabs/projects/details/${this.baseService.getProjects().length - 1}`]);
  }
}
