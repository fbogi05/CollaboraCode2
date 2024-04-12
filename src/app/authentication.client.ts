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
    return this.http.post(environment.apiUrl + '/login', { email, password });
  }

  public register(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/sign-up',
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password
      },
      { responseType: 'json' }
    );
  }
}