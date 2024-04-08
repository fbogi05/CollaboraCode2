import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  createProject(projectName: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/project`, { projectName });
  }

  createFile(fileName: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/file`, { fileName });
  }

  openFile(fileName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/openFile/${fileName}`);
  }

  addUser(email: string){
    return this.http.post(`${environment.apiUrl}/project/member/add`, {email});
  }
}