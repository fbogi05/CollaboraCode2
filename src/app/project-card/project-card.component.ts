import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;

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

    this.baseService.getProjectInfoWithId(this.project.id).subscribe((project: any) => {
      this.project = project[0];
    })
  }

  openProject(project: any) {
    this.baseService.currentProjectId = project.id;
    this.router.navigate(['/tabs/projects/details/' + project.name]);
  }
}
