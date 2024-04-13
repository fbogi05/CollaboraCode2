import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { Subscription } from 'rxjs';

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
  currentProjectName: string = this.baseService.currentProjectName;

  constructor(private baseService: BaseService, private router: Router) {}

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
    let retryCount = 0;

    let retries = setInterval(() => {
      this.baseService
        .getProjectInfoWithName(this.currentProjectName)
        .subscribe((projectData: any) => {
          this.project = projectData[0];
          this.fieldData.projectName.value = projectData[0].name;
        });
      retryCount++;
      if (this.project) {
        clearInterval(retries);
      } else if (retryCount >= 30) {
        clearInterval(retries);
      }
    }, 100);
  }

  updateProject() {
    this.baseService
      .updateProject(this.project.id, this.fieldData.projectName.value)
      .subscribe((projectData: any) => {
        this.project = projectData;
        this.baseService.currentProjectName = projectData.name;
      });
  }

  deleteProject() {
    if (this.project.id) {
      this.baseService.deleteProject(this.project.id).subscribe();
    }
  }

  goBack() {
    this.router.navigate([
      `/tabs/projects/details/${this.baseService.currentProjectName}`,
    ]);
  }
}
