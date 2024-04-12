import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';
import { Observable, Subscription } from 'rxjs';
import { ProjectDetailsPage } from '../project-details/project-details.page';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {
  @Input() file: any;

  constructor(private projectDetails: ProjectDetailsPage) {
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

  showFileChanges() {
    this.projectDetails.showFileChanges(this.file);
  }
}
