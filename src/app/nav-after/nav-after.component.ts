import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent{

  isDropdownOpen: boolean = false;
  loggedInName!: string;

  constructor(private auth: AuthService){ 
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.auth.logout();
  }
}
