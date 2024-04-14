import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent{

  owns: any[] = [];
  memberOf: any[] = [];
  showInput: boolean = false;
  projectName: string = "";

  constructor(private backendService: BackendService, private auth: AuthService, private http: HttpClient) { 

    let user_email = "" 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
    this.backendService.getAccountInfo(this.auth.getToken()!).subscribe(
      (user: any) => {
        
        user_email = user.email

        this.backendService.getUserProjects(user_email).subscribe({
          next:(response: any) => {
            console.log('Owned Projects:', response.owns);
            console.log('Member Projects:', response.memberOf);
            this.owns = response.owns;
            this.memberOf = response.memberOf;
          },
          error: (error) => {
            console.error('Error fetching projects:', error);
          }
        });
      }
    )
  }


  createProject() {
    const token: string = this.auth.getToken()!;
    this.backendService.createProject(this.projectName, token).subscribe({
      next: response => {
        console.log('Projekt létrehozva:', response);
        this.owns.push(response);
      },
      error: error => {
        console.error('Hiba történt a projekt létrehozása közben:', error);
      }
    });
  }
}
