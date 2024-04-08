import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  files: any[] = [];

  constructor(private backendService: BackendService, private auth: AuthService) { }

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

  deleteProject(){
    const token: string = this.auth.getToken()!;
    this.backendService.deleteProject(projectName, token);
  }
}
