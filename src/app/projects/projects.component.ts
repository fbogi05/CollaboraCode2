import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  fileStructure: any;

  constructor(private backendService: BackendService) { }

  onFolderCreate() {
    const newFolderName = 'új mappa neve';
    this.backendService.createFolder(newFolderName).subscribe({
      next: response => {
        console.log('Mappa létrehozva:', response);
      },
      error: error => {
        console.error('Hiba történt a mappa létrehozása közben:', error);
      }
    });
  }
}
