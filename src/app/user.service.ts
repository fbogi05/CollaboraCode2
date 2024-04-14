import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private backendService: BackendService) { }

  getUserData(auth_token: string) {
    return this.http.get(`${environment.apiUrl}/account/info`, { headers: this.backendService.getHeaders(auth_token) });
  }
}