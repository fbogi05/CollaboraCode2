import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

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

  constructor(private navController: NavController) {}

  getIcon(tab: string) {
    return this.tabs?.getSelected() === tab
      ? this.icons[tab].active
      : this.icons[tab].inactive;
  }

  isSelectedTab(tab: string) {
    return this.tabs?.getSelected() === tab;
  }

  ngOnInit() {
    this.navController.navigateRoot('tabs');
  }
}
