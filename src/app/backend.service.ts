import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  getHeaders(auth_token: string) {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
    });
  }

  createProject(name: string, auth_token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project/create`, { name }, {headers: this.getHeaders(auth_token)});
  }

  createFile(fileName: string, projectName: string, auth_token: string): Observable<any> {
    console.log('Információk lekérése a következő projekthez:', projectName);
  
    return this.http.post(`${environment.apiUrl}/project/info`, { name: projectName }, { headers: this.getHeaders(auth_token) }).pipe(
      tap((project: any) => {
        console.log('Információk lekérve a következő projekthez:', projectName, project);
      }),
      switchMap((project: any) => {
        if (project && project[0].id) {
          console.log('Kísérlet a fájl létrehozására:', fileName, 'a következő projektben:', projectName);
  
          return this.http.post(`${environment.apiUrl}/file/create`, { name: fileName, project_id: project[0].id }, { headers: this.getHeaders(auth_token) }).pipe(
            tap((response: any) => {
              console.log('Fájl létrehozva a következő projektben:', projectName, response);
            }),
            catchError((createError: any) => {
              console.error('Hiba a fájl létrehozásakor a következő projektben:', projectName, createError);
              return throwError(createError);
            })
          );
        } else {
          console.error('Az azonosító nem található a következő projekthez:', projectName);
          return throwError('Az azonosító nem található a következő projekthez:' + projectName);
        }
      }),
      catchError((error: any) => {
        console.error('Hiba az adatok lekérése közben a következő projekthez:', projectName, error);
        return throwError(error);
      })
    );
  }

  openFile(fileName: string, auth_token: string): Observable<any> {
    console.log('Fetching file info for:', fileName);
  
    return this.http.post(`${environment.apiUrl}/file/info`, { fileName: fileName }, { headers: this.getHeaders(auth_token) }).pipe(
      tap((fileInfo: any) => {
        console.log('File info retrieved for:', fileName, fileInfo);
      }),
      switchMap((fileInfo: any) => {
        if (fileInfo && fileInfo.id) {
          console.log('Attempting to retrieve file content for:', fileName);
  
          return this.http.post<string>(`${environment.apiUrl}/file/content`, {id: fileInfo.id}).pipe(
            map((content: string) => {
              console.log('File content retrieved for:', fileName);
              return { fileInfo, content };
            }),
            catchError((contentError: any) => {
              console.error('Error retrieving file content for:', fileName, contentError);
              return throwError(contentError);
            })
          );
        } else {
          console.error('File id not found for:', fileName);
          return throwError('File id not found for:' + fileName);
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching file info for:', fileName, error);
        return throwError(error);
      })
    );
  }

  addUser(user_email: string, projectName: string, auth_token: string){
    return this.http.post(`${environment.apiUrl}/project/info`, { name: projectName }, { headers: this.getHeaders(auth_token) }).pipe(
      tap((project: any) => {
        console.log('A projekt információi lekérve:', project);
      }),
      switchMap((project: any) => {
        if (project && project[0].id) {
          return this.http.post(`${environment.apiUrl}/project/member/add`, {user_email, project_id:project[0].id}, {headers: this.getHeaders(auth_token)}).pipe(
            catchError((addError: any) => {
              console.error('Hiba a szerkesztő hozzáadása közben:', addError);
              return throwError(addError);
            })
          );
        } else {
          console.error('A projekt azonosító nem található');
          return throwError('A projekt azonosító nem található');
        }
      }),
      catchError((error: any) => {
        console.error('Hiba a projekt információinak lekérése közben:', error);
        return throwError(error);
      })
    );
  }

  getAccountInfo(auth_token: string){
    return this.http.get(`${environment.apiUrl}/account/info`, {headers: this.getHeaders(auth_token)});
  }

  deleteProject(projectName: string, auth_token: string): Observable<any> {
    console.log('Kísérlet a projekt törlésére:', projectName);
  
    return this.http.post(`${environment.apiUrl}/project/info`, { name: projectName }, { headers: this.getHeaders(auth_token) }).pipe(
      tap((project: any) => {
        console.log('A projekt információi lekérve:', project);
      }),
      switchMap((project: any) => {
        if (project && project[0].id) {
          return this.http.delete(`${environment.apiUrl}/project/delete/`, {body: {id:project[0].id}, headers: this.getHeaders(auth_token) }).pipe(
            catchError((deleteError: any) => {
              console.error('Hiba a projekt törlése közben:', deleteError);
              return throwError(deleteError);
            })
          );
        } else {
          console.error('A projekt azonosító nem található');
          return throwError('A projekt azonosító nem található');
        }
      }),
      catchError((error: any) => {
        console.error('Hiba a projekt információinak lekérése közben:', error);
        return throwError(error);
      })
    );
  }

  getProjectInfo(projectName: string, auth_token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project/info`, { name: projectName }, { headers: this.getHeaders(auth_token) }).pipe(
      tap((project: any) => {
        console.log('A projekt információi lekérve:', project);
      })
    );
  }
}