import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild('menu') menu: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/settings') {
        this.menu.close();
      }
    })
  }

}
