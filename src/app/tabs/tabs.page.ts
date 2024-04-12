import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  icons: { [key: string]: { active: string; inactive: string } } = {
    home: {
      inactive: 'assets/home.svg',
      active: 'assets/home_filled.svg',
    },
    projects: {
      inactive: 'assets/projects.svg',
      active: 'assets/projects_filled.svg',
    },
    settings: {
      inactive: 'assets/settings.svg',
      active: 'assets/settings_filled.svg',
    },
  };
  @ViewChild('tabs') tabs?: IonTabs;

  constructor(private authService: AuthService, private themeService: ThemeService) {}

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

    this.themeService.isDarkMode$.subscribe((isDark) => {
      document.body.classList.toggle('dark', isDark);
    });

    this.authService.renewToken();
  }

  getIcon(tab: string) {
    return this.tabs?.getSelected() === tab
      ? this.icons[tab].active
      : this.icons[tab].inactive;
  }

  isSelectedTab(tab: string) {
    return this.tabs?.getSelected() === tab;
  }
}
