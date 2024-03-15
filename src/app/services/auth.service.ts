import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = {
    loggedIn: false,
  };

  constructor() {}

  isAuthenticated() {
    return localStorage.getItem('user');
  }

  setAuthenticated(authenticated: boolean) {
    this.user.loggedIn = authenticated;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
