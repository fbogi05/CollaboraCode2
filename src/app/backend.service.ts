import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  createProject(name: string, auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post(`${environment.apiUrl}/project/create`, { name }, {headers: headers});
  }

  createFile(fileName: string, projectId: number, auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    return this.http.post(`${environment.apiUrl}/file/create`, { name: fileName, project_id: projectId }, { headers: headers });
  }

  openFile(name: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/file/edit/${name}`);
  }

  addUser(user_email: string, project_id: any, auth_token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post(`${environment.apiUrl}/project/member/add`, {user_email, project_id}, {headers: headers});
  }

  getAccountInfo(auth_token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(`${environment.apiUrl}/account/info`, {headers: headers});
  }

  deleteProject(name: any, auth_token: string){
    let projectId = -1;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    this.http.post(`${environment.apiUrl}/project/info`, {name}, {headers: headers}).subscribe((project:any) => {
      projectId = project.id;
      this.http.delete(`${environment.apiUrl}/project/delete`, {body:{id:projectId}, headers: headers})
    })
    return projectId;
  }

  getProjectInfo(auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    return this.http.post(`${environment.apiUrl}/project/info`, {headers: headers}).pipe(
      switchMap((project: any) => {
        const projectId = project.id;
        return this.http.post(`${environment.apiUrl}/project/info`, {id: projectId}, {headers: headers});
      })
    );
  }
}