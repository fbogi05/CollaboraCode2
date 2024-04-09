import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  iconPaths = {
    password: {
      passwordVisible: 'assets/password_visible.svg',
      passwordHidden: 'assets/password_hidden.svg',
    },
  };
  url = 'https://collaboracode-backend.onrender.com/';
  currentProjectId: number | null = null;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getPasswordIcon(passwordVisibility: boolean) {
    return this.iconPaths.password[
      passwordVisibility ? 'passwordVisible' : 'passwordHidden'
    ];
  }

  getUser(email: string) {
    const userToken = localStorage.getItem('token');
    let user;

    this.httpClient
      .post(
        `${this.url}account/info`,
        { user_email: email },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .subscribe({
        next: (data: any) => (user = data.user),
        error: (error) => console.log(error),
      });

    return user;
  }

  getUserProjects(): Observable<any[]> {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient
      .get<any>(`${this.url}account/info`, {
        headers: headers,
      })
      .pipe(
        switchMap((userData: any) => {
          const userEmail = userData.email;
          return this.httpClient.post<any[]>(
            `${this.url}user/projects`,
            {
              user_email: userEmail,
            },
            { headers: headers }
          );
        })
      );
  }

  createProject(projectName: string, users: any[]) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );

    return this.httpClient.post(
      `${this.url}project/create`,
      {
        name: projectName,
      },
      {
        headers: headers,
      }
    );
  }

  getProjectFiles(): Observable<any[]> {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient
      .get<any>(`${this.url}account/info`, {
        headers: headers,
      })
      .pipe(
        switchMap((userData: any) => {
          const userEmail = userData.email;
          return this.httpClient.post<any[]>(
            `${this.url}project/files`,
            {
              project_id: this.currentProjectId,
            },
            { headers: headers }
          );
        })
      );
  }

  async removeProject(index: number) {
    // const projects = this.getUserProjects();
    // projects.splice(index, 1);
    // localStorage.setItem('projects', JSON.stringify(projects));
  }
}
