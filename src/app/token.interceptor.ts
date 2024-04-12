import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}