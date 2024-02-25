import { Component, OnInit, ViewChild } from '@angular/core';
import { EventType, Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild('menu') menu?: IonMenu;

  constructor(private router: Router) {}

  ngOnInit() {
    return;
    this.router.events.subscribe((event) => {
      if (
        event.type === EventType.NavigationEnd &&
        this.router.url === '/settings'
      ) {
        console.log('closing menu');
        this.menu?.close();
      }
    });
  }
}
