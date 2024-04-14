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
    console.log('Fájlinformációk lekérése a következő fájlhoz:', fileName);
  
    return this.http.post(`${environment.apiUrl}/file/info`, { name: fileName }, { headers: this.getHeaders(auth_token) }).pipe(
      switchMap((fileInfo: any) => {
        if (fileInfo && fileInfo[0].id) {
          console.log('Tartalom lekérése a következő fájlhoz:', fileName);
  
          return this.http.post<string>(`${environment.apiUrl}/file/content`, { id: fileInfo[0].id }).pipe(
            map((result: any) => {
              console.log('Tartalom sikeresen lekérve a következő fájlhoz:', fileName);
              return { fileInfo, content:result.content };
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

  editCode(fileName: string, content: string, auth_token: string): Observable<any> {
    console.log('Saving file:', fileName);
  
    return this.http.post(`${environment.apiUrl}/file/info`, { name: fileName }, { headers: this.getHeaders(auth_token) }).pipe(
      switchMap((fileInfo: any) => {
        if (fileInfo && fileInfo[0].id) {
          console.log('File info retrieved for:', fileName, fileInfo);
  
          return this.http.put(`${environment.apiUrl}/file/edit`, { id: fileInfo[0].id, content }, { headers: this.getHeaders(auth_token) }).pipe(
            tap((response: any) => {
              console.log('File saved:', response);
            }),
            catchError((error: any) => {
              console.error('Error saving file:', error);
              return throwError(error);
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
          return this.http.post(`${environment.apiUrl}/project/member/add`, {user_email:user_email, project_id:project[0].id}, {headers: this.getHeaders(auth_token)}).pipe(
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

  modifyUser(user: any, auth_token: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/account/modify`, user, { headers: this.getHeaders(auth_token) })
      .pipe(
        tap(response => console.log('Felhasználói adatok sikeresen frissítve: ', response)),
        catchError(error => {
          console.error('Hiba az adatok frissítése közben: ', error);
          return throwError(error);
        })
      );
  }

  deleteAccount(auth_token: string): Observable<any> {
    console.log('Kísérlet a fiók törlésére');
    return this.http.delete(`${environment.apiUrl}/account/delete/`, { headers: this.getHeaders(auth_token) })
      .pipe(
        tap(response => console.log('Fiók sikeresen törölve:', response))
      );
  }

  getUserProjects(auth_token: string): Observable<any> {
    console.log('Fetching account information');

    return this.http.get(`${environment.apiUrl}/account/info`, { headers: this.getHeaders(auth_token) })
      .pipe(
        switchMap((accountInfo: any) => {
          if (accountInfo && accountInfo.email) {
            const email = accountInfo.email;
            console.log('Fetching user projects for email:', email);

            return this.http.post(`${environment.apiUrl}/user/projects`, { user_email: email }, { headers: this.getHeaders(auth_token) })
              .pipe(
                tap((projects: any) => {
                  console.log('User projects fetched for email:', email, projects);
                }),
                catchError((error: any) => {
                  console.error('Error fetching user projects for email:', email, error);
                  return throwError(error);
                })
              );
          } else {
            console.error('Email not found in account information');
            return throwError('Email not found in account information');
          }
        }),
        catchError((error: any) => {
          console.error('Error fetching account information:', error);
          return throwError(error);
        })
      );
  }




}