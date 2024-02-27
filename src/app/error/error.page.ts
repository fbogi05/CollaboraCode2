import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  redirectionTime = 5;

  constructor(private router: Router) {}

  ngOnInit() {
    this.redirect();
  }

  redirect() {
    let interval = setInterval(() => {
      this.redirectionTime--;
      if (this.redirectionTime === 0) {
        this.backToHomePage();
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, this.redirectionTime * 1000);
  }

  backToHomePage() {
    this.redirectionTime = 0;
    this.router.navigate(['/tabs/home']);
  }
}
