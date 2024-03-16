import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  createFolder(folderName: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/createFolder`, { folderName });
  }

  createFile(fileName: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/createFile`, { fileName });
  }

  openFile(fileName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/openFile/${fileName}`);
  }
}