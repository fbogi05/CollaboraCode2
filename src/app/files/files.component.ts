import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  files: any[] = [];
  showInput: boolean = false;
  fileName: string = "";

  constructor(private backendService: BackendService, private auth: AuthService, private http: HttpClient, private projectService: ProjectService) {  
    let projectName = this.projectService.getProjectNameFromUrl();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  
    this.backendService.getProjectInfo(projectName, this.auth.getToken()!).subscribe(
      (project: any) => {
        const projectId = project[0].id;
  
        this.http.post(`${environment.apiUrl}/project/files`, { project_id: projectId }, { headers: headers }).subscribe((files: any) => {
          this.files = files;
        });
      }
    );
  }

  deleteProject() {
    const token: string = this.auth.getToken()!;
    let projectName = this.projectService.getProjectNameFromUrl();
  
    if (!projectName || projectName.trim() === '') {
      console.error('A projekt neve üres vagy nem létezik. A projekt nem törölhető.');
      return;
    }
  
    this.backendService.deleteProject(projectName, token).subscribe({
      next: (response) => {
        console.log('Projekt sikeresen törölve:', response);
        window.location.replace('/projects');
      },
      error: (error) => {
        console.error('Hiba a projekt törlése közben:', error);
      }
    });
  }

  createFile() {
    const token: string = this.auth.getToken()!;
    let projectName = this.projectService.getProjectNameFromUrl();
  
    if (!projectName) {
      console.error('Hiba: Nem sikerült lekérni az aktuális projekt nevét.');
      return;
    }
  
    this.backendService.createFile(this.fileName, projectName, token).subscribe({
      next: response => {
        console.log('Fájl létrehozva:', response);
        this.files.push(response);
      },
      error: error => {
        console.error('Hiba a fájl létrehozása közben:', error);
      }
    });
  }

  openFile() {
    const token: string = this.auth.getToken()!;
    let fileName = this.projectService.getFileNameFromUrl();

    this.backendService.openFile(fileName, token).subscribe({
      next:(result: any) => {
        console.log('File content retrieved:', result);
      },
      error:(error: any) => {
        console.error('Error opening file:', error);
      }
    });
  }
}
