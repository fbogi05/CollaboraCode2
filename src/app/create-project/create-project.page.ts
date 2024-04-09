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
    },
  };
  users: any[] = [];

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

  addUser() {
    this.users.push(this.baseService.getUser(this.fieldData.userSearch.value));
  }

  createProject() {
    this.baseService
      .createProject(this.fieldData.projectName.value, this.users)
      .subscribe((project: any) => {
        this.router.navigate([`/tabs/projects/details/${project.name}`]);
      });
  }
}
