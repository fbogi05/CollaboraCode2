import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  files: any[] = [];

  constructor(private backendService: BackendService) { }

  onFileCreate() {
    const newFileName = 'új mappa neve';
    this.backendService.createFile(newFileName).subscribe({
      next: response => {
        console.log('Fájl létrehozva:', response);
        this.files.push(response);
      },
      error: error => {
        console.error('Hiba történt a fájl létrehozása közben:', error);
      }
    });
  }
}
