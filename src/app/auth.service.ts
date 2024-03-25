import { Injectable } from '@angular/core';
import { AuthenticationClient } from './authentication.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private authenticationClient: AuthenticationClient) { }

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        window.location.replace('/home');
      },
      error: (error) => {
      console.error('Login error:', error.error.message);
      alert('Hibás e-mail cím és/vagy jelszó!');
      }
    });
  }

  public signUp(firstName: string, lastName: string, email: string, password: string, password_confirmation: string): void {
    this.authenticationClient.register(firstName, lastName, email, password, password_confirmation).subscribe({
      next: (response: any) => {
          localStorage.setItem(this.tokenKey, response.token);
          alert('Sikeres regisztráció.');
      },
      error: (error) => {
        console.error('Hiba történt a regisztráció során:', error);
        alert('Hiba történt a regisztráció során. Kérjük, próbálja újra később.');
      }
    });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    window.location.replace('/');
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
