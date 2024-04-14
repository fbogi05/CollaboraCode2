import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://collaboracode-backend.onrender.com/';

  constructor(private http: HttpClient, private router: Router) {
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
    passwordConfirmation: string
  ) {
    return this.http.post(
      this.url + 'sign-up',
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
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

  async logout(redirect = true) {
    const token = this.getToken();
    this.setToken('');
    await this.http.post(
      this.url + 'logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        observe: 'response',
      }
    );
    if (redirect) this.router.navigate(['/login']);
  }

  renewToken() {
    const token = this.getToken(); 
    this.http
      .post(
        this.url + 'token/renew',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          observe: 'response',
        }
      )
      .subscribe({
        next: (data) => {
          const body: any = data.body;
          this.setToken(body.token);         
        },
        error: (error) => {
          console.log(error);
          if (error.status === 401) this.logout();
        },
      });
  }
}
