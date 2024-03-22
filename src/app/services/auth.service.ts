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
    return JSON.parse(localStorage.getItem('user')!).loggedIn;
  }

  setAuthenticated(authenticated: boolean) {
    this.user.loggedIn = authenticated;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
