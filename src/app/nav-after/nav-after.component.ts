import { Component } from '@angular/core';
import { ActiveService } from '../active.service';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent {

  constructor(private active: ActiveService){ }
  
  isDropdownOpen: boolean = false;

  get isLoggedIn(){
    return this.active.isLoggedIn;
  }

  logout(){
    this.active.logout();
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
