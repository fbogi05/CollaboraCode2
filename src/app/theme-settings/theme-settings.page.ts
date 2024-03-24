import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.page.html',
  styleUrls: ['./theme-settings.page.scss'],
})
export class ThemeSettingsPage implements OnInit {
  @ViewChild('themeSelection') themeSelection!: HTMLElement;

  constructor() {}

  ngOnInit() {
    if (
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      alert('dark');
    } else {
      document.documentElement.classList.remove('dark');
      alert('light');
    }
  }
}
