import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
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

  getAccountInformation() {
    const userToken = localStorage.getItem('token');
    return this.httpClient.get(`${this.url}account/info`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
  }

  updateAccountInformation(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const userToken = localStorage.getItem('token');
    let values: {
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
    } = {};
    if (firstName != '') {
      values.first_name = firstName;
    }
    if (lastName != '') {
      values.last_name = lastName;
    }
    if (email != '') {
      values.email = email;
    }
    if (password != '') {
      values.password = password;
    }
    return this.httpClient.put(`${this.url}account/modify`, values, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
  }

  deleteAccount() {
    const userToken = localStorage.getItem('token');
    return this.httpClient.delete(`${this.url}account/delete`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
  }

  getProjectInfoWithId(id: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}project/info`,
      {
        id: id,
      },
      { headers: headers }
    );
  }

  getProjectInfoWithName(name: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}project/info`,
      {
        name: name,
      },
      { headers: headers }
    );
  }

  getUserProjects(): Observable<any[]> {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.getAccountInformation().pipe(
      switchMap((accountData: any) => {
        const userEmail = accountData.email;
        return this.httpClient.post<any[]>(
          `${this.url}user/projects`,
          {
            user_email: userEmail,
          },
          { headers: headers }
        );
      }),
      catchError((error) => {
        return [];
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

  createFile(fileName: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}file/create`,
      {
        name: fileName,
        project_id: this.currentProjectId,
      },
      {
        headers: headers,
      }
    );
  }

  removeProject(index: number) {
    // const projects = this.getUserProjects();
    // projects.splice(index, 1);
    // localStorage.setItem('projects', JSON.stringify(projects));
  }

  getLastEditInformation(fileId: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}file/info/edit`,
      {
        id: fileId,
      },
      { headers: headers }
    );
  }
}
