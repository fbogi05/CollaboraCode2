import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: any[] = [];

  constructor(private backendService: BackendService, private auth: AuthService, private http: HttpClient) { 

    let user_email = "" 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
    this.backendService.getAccountInfo(this.auth.getToken()!).subscribe(
      (user: any) => {
        
        user_email = user.email

        this.http.post(`${environment.apiUrl}/user/projects`, {user_email}, {headers: headers}).subscribe((projects: any) => {
          this.projects = projects;
        });
      }
    )


  }

  onProjectCreate() {
    const name = 'ujProjekt';
    const token: string = this.auth.getToken()!;
    this.backendService.createProject(name, token).subscribe({
      next: response => {
        console.log('Projekt létrehozva:', response);
        this.projects.push(response);
      },
      error: error => {
        console.error('Hiba történt a projekt létrehozása közben:', error);
      }
    });
  }
}
