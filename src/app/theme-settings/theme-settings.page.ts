import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.page.html',
  styleUrls: ['./theme-settings.page.scss'],
})
export class ThemeSettingsPage implements OnInit {
  @ViewChild('themeSelector') themeSelector!: HTMLSelectElement;

  constructor() {}

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

  setTheme(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (selectedValue === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.removeItem('theme');
    }
  }
}
