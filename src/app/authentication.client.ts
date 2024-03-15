import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/login',
      {
        email: email,
        password: password,
      }
    );
  }

  public register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/sign-up',
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}