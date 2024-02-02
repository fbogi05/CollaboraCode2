import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild('menu') menu: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/home') {
        this.menu.close();
      }
    })
  }
}
