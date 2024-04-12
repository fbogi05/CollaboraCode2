import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings-options',
  templateUrl: './settings-options.page.html',
  styleUrls: ['./settings-options.page.scss'],
})
export class SettingsOptionsPage implements OnInit {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
