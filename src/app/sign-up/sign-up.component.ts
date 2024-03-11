import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActiveService } from '../active.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private active: ActiveService, private auth: AuthService) {
  }

  get isLoggedIn() {
    return this.active.isLoggedIn;
  }

  registerActive() {
    this.active.login();
  }

  register(firstName: string, lastName: string, email: string, password: string): void {
    this.auth.register(firstName, lastName, email, password).subscribe({
      next:(response) => {
        console.log('Sikeres regisztráció:', response);
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = '/home';
      },
      error:(error) => {
        console.error('Sikertelen regisztráció:', error);
      }
    });
  }

}
