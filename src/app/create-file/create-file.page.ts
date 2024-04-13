import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { ProjectDetailsPage } from '../project-details/project-details.page';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.page.html',
  styleUrls: ['./create-file.page.scss'],
  providers: [ProjectDetailsPage],
})
export class CreateFilePage implements OnInit {
  fieldData = {
    fileName: {
      value: '',
    },
  };
  users: any[] = [];
  currentProjectName = '';

  constructor(
    private projectDetails: ProjectDetailsPage,
    private baseService: BaseService,
    private router: Router
  ) {}

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
        this.currentProjectName = project[0].name;
      });
  }

  createFile() {
    this.baseService
      .createFile(this.fieldData.fileName.value)
      .subscribe((file: any) => {
        this.projectDetails.getProjectFiles();
        this.router.navigate([
          `/tabs/projects/details/${this.currentProjectName}`,
        ]);
      });
  }

  prevoiusPage() {
    this.router.navigate([`/tabs/projects/details/${this.currentProjectName}`]);
  }
}
