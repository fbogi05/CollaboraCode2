import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$: Observable<string | null>;

  url = 'https://collaboracode-backend.onrender.com/';

  constructor(private http: HttpClient, private router: Router) {
    const initialToken = localStorage.getItem('token') ?? null; // Use nullish coalescing
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
    this.token$ = this.tokenSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.getValue() !== null;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any> {
    return this.http.post(this.url + 'sign-up', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(this.url + 'login', { email, password }, { observe: 'response' })
      .pipe(
        map((data) => {
          const body: any = data.body;
          this.setToken(body.token);
          return body;
        }),
        catchError((error) => {
          console.error('Error logging in:', error);
          throw error; // Re-throw the error for handling in the component
        })
      );
  }

  logout(redirect = true) {
    const token = this.getToken();
    this.setToken('');
    this.http
      .post(
        this.url + 'logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          observe: 'response',
        }
      )
      .subscribe({
        complete: () => {
          if (redirect) this.router.navigate(['/login']);
        },
        error: (error) => console.error('Error logging out:', error),
      });
  }

  renewToken(): Observable<string | null> {
    const currentToken = this.getToken();

    if (!currentToken) {
      // No token available, handle the case (e.g., prompt for login)
      console.error('No token found for renewal.');
      return throwError(() => new Error('No token available'));
    }

    return this.http
      .post<any>(
        this.url + 'token/renew',
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
          observe: 'response',
        }
      )
      .pipe(
        map((data) => {
          const body: any = data.body;
          this.setToken(body.token);
          return body.token;
        }),
        catchError((error) => {
          console.error('Error renewing token:', error);
          if (error.status === 401) {
            this.logout();
          }
          // Optionally return a default value or throw a different error
          return throwError(() => new Error('Failed to renew token'));
        })
      );
  }
}
