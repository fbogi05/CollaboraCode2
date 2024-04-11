import { Component, OnInit } from '@angular/core';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.page.html',
  styleUrls: ['./project-settings.page.scss'],
})
export class ProjectSettingsPage implements OnInit {
  fieldData = {
    projectName: {
      value: '',
    },
  };
  project: any;
  currentProjectName: string = this.baseService.currentProjectName!;

  constructor(
    private baseService: BaseService,
    private router: Router  ) {}

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

    this.setFieldValues();
  }

  setFieldValues() {
    this.currentProjectName = this.router.url.split('/')[4];

    if (this.project.name) {
      this.baseService
        .getProjectInfoWithName(this.project.name)
        .subscribe((projectData: any) => {
          console.log(projectData);
          this.fieldData.projectName.value = projectData.fileName;
          this.project.id = projectData.id;
        });
    }
  }

  updateProject() {
    if (this.project.id) {
      this.baseService
        .updateFile(this.project.id, this.fieldData.projectName.value)
        .subscribe((fileData: any) => {
          console.log(fileData);
        });
    }
  }

  deleteProject() {
    if (this.project.id) {
      this.baseService.deleteFile(this.project.id).subscribe();
    }
  }
}
