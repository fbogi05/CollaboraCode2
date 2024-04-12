import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getProjectNameFromUrl(): string {
    const url = window.location.pathname;
    const segments = url.split('/');
    const name = segments[segments.length - 1];
    return name;
  }

  getFileNameFromUrl(): string {
    const url = this.router.url;
    const segments = url.split('/');
    const fileName = segments[segments.length - 1];
    return fileName;
  }

  constructor(private router: Router) { }
}
