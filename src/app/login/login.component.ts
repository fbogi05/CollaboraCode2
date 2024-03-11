import { Component } from '@angular/core';
import { ActiveService } from '../active.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private active: ActiveService, private auth: AuthService) {
  }

  get isLoggedIn(){
    return this.active.isLoggedIn;
  }

  loginActive(){
    this.active.login();
  }

  login(email: string, password: string): void {
    this.auth.login(email, password).subscribe({
      next:(response) => {
        console.log('Sikeres bejelentkezés:', response);
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = '/home';
      },
      error:(error) => {
        console.error('Sikertelen bejelentkezés:', error);
      }
    });
  }


}
