import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  files: any[] = [];
  showInput: boolean = false;
  fileName: string = "";

  constructor(private backendService: BackendService, private auth: AuthService, private http: HttpClient) {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
    this.backendService.getProjectInfo(this.auth.getToken()!).subscribe(
      (project: any) => {
        const projectId = project.project_id;
  
        this.http.post(`${environment.apiUrl}/project/files`, { projectId }, { headers: headers }).subscribe((files: any) => {
          this.files = files;
        });
      }
    )
  }
  
  onFileCreate() {
  const token: string = this.auth.getToken()!;
  const projectId = 1;

  this.backendService.createFile(this.fileName, projectId, token).subscribe({
    next: response => {
      console.log('Fájl létrehozva:', response);
      this.files.push(response);
    },
    error: error => {
      console.error('Hiba a fájl létrehozása közben:', error);
    }
  });
}

  deleteProject(){
    const token: string = this.auth.getToken()!;
    let projectName = "";
    this.backendService.deleteProject(projectName, token)

    window.location.replace('/projects');
  }

  openFile(){
    let fileName = "";
  }
}
