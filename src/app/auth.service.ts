import { Injectable } from '@angular/core';
import { AuthenticationClient } from './authentication.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private authenticationClient: AuthenticationClient) { }

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe((user) => {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.replace('/home');
    });
  }

  public signUp(firstName: string, lastName: string, email: string, password: string): void {
    this.authenticationClient
      .register(firstName, lastName, email, password)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        window.location.replace('/home');
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
