import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  createFile(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/file/create`, { name });
  }

  openFile(name: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/openFile/${name}`);
  }

  addUser(email: string){
    return this.http.post(`${environment.apiUrl}/project/member/add`, {email});
  }

  public getAccountInfo(auth_token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(`${environment.apiUrl}/account/info`, {headers: headers});
  }
}