import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  firstName!: string;
  lasName!: string;
  email!: string;
  password!: string;

  constructor(private auth:AuthService) { }

  SubmitRegistration(firstName: string, lastName: string, email: string, password: string): void {
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
