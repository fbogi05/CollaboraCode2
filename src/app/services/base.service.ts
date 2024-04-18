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
  projects: any = [];
  currentProjectId?: number;
  currentProjectName: string = '';
  selectedFile: any;
  projectFiles: any = [];
  lastEditInformation: any;

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
    const userToken = this.authService.getToken();
    return this.httpClient.get(`${this.url}account/info`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
  }

  updateAccountInformation(
    firstName: string,
    lastName: string,
    password: string
  ) {
    const userToken = localStorage.getItem('token');
    let values: {
      first_name?: string;
      last_name?: string;
      password?: string;
    } = {};
    if (firstName != '') {
      values.first_name = firstName;
    }
    if (lastName != '') {
      values.last_name = lastName;
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

  getUserProjects(): Observable<any> {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );    
    return this.getAccountInformation().pipe(
      switchMap((accountData: any) => {
        const userEmail = accountData.email;
        return this.httpClient.post<any>(
          `${this.url}user/projects`,
          {
            user_email: userEmail,
          },
          { headers: headers }
        );
      }),
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

  getFileInfoWithId(id: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}file/info`,
      {
        id: id,
      },
      { headers: headers }
    );
  }

  getFileInfoWithName(name: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}file/info`,
      {
        name: name,
      },
      { headers: headers }
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

  updateFile(id: number, fileName: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.put(
      `${this.url}file/modify`,
      {
        id: id,
        name: fileName,
      },
      {
        headers: headers,
      }
    );
  }

  deleteFile(id: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.delete(`${this.url}file/delete`, {
      body: { id: id },
      headers: headers,
    });
  }

  updateProject(id: number, projectName: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.put(
      `${this.url}project/modify`,
      {
        id: id,
        name: projectName,
      },
      {
        headers: headers,
      }
    );
  }

  deleteProject(id: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.delete(`${this.url}project/delete`, {
      body: { id: id },
      headers: headers,
    });
  }

  getFileContent(fileId: number) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.post(
      `${this.url}file/content`,
      {
        id: fileId,
      },
      { headers: headers }
    );
  }

  editFileContent(fileId: number, content: string) {
    const headers = new HttpHeaders(
      `Authorization: Bearer ${this.authService.getToken()}`
    );
    return this.httpClient.put(
      `${this.url}file/edit`,
      {
        id: fileId,
        content: content,
      },
      { headers: headers }
    );
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
