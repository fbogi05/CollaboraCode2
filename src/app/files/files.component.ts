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
    const file_name = 'ujFajl';
    this.backendService.createFile(file_name).subscribe({
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
