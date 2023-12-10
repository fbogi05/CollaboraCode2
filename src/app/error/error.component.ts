import { Component } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  redirectionTime = 9;

  constructor(private router: Router) {
    this.redirectAfter();
  }

  redirectAfter() {
    let interval = setInterval(() => {
      this.redirectionTime--;
      if (this.redirectionTime === 0) {
        this.router.navigate(['/home']);
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, this.redirectionTime * 1000);
  }
}
