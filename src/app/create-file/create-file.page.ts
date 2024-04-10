import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.page.html',
  styleUrls: ['./create-file.page.scss'],
})
export class CreateFilePage implements OnInit {
  fieldData = {
    fileName: {
      value: '',
    },
  };
  users: any[] = [];
  currentProjectName = '';

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

    this.baseService
      .getProjectInfoWithId(this.baseService.currentProjectId!)
      .subscribe((project: any) => {
        console.log(this.baseService.currentProjectId);
        
        this.currentProjectName = project.name
      });
  }

  createFile() {
    this.baseService
      .createFile(this.fieldData.fileName.value)
      .subscribe((file: any) => {
        this.router.navigate([`/tabs/projects/details/${this.currentProjectName}`]);
      });
  }
}
