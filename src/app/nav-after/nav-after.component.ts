import { Component } from '@angular/core';
import { ActiveService } from '../active.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent {

  constructor(private active: ActiveService, private auth: AuthService){ }
  
  isDropdownOpen: boolean = false;

  get isLoggedIn(){
    return this.active.isLoggedIn;
  }

  logActive(){
    this.active.logout();
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.auth.logout()
      .subscribe({
        next:(response) => {
        this.auth.clearSession();
      },
        error: (error) => {
          console.error('Sikertelen kijelentkezés:', error);
        }
      });
  }
}
