import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3333/';

  constructor(private http: HttpClient) {
    if (!localStorage.getItem('token')) localStorage.setItem('token', '');
  }

  isAuthenticated() {
    return this.getToken() !== '';
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post(
      this.url + 'sign-up',
      { firstName, lastName, email, password, password_confirmation },
      { observe: 'response' }
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      this.url + 'login',
      { email, password },
      { observe: 'response' }
    );
  }

  logout() {
    const token = this.getToken();
    this.setToken('');
    return this.http.post(
      this.url + 'logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        observe: 'response',
      }
    );
  }
}
