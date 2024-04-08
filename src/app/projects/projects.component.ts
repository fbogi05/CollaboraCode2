import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: any[] = [];

  constructor(private backendService: BackendService) { }

  onFolderCreate() {
    const newProjectName = 'új projekt';
    this.backendService.createProject(newProjectName).subscribe({
      next: response => {
        console.log('Mappa létrehozva:', response);
        this.projects.push(response);
      },
      error: error => {
        console.error('Hiba történt a projekt létrehozása közben:', error);
      }
    });
  }
}
