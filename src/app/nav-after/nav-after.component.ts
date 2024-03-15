import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent implements OnInit{

  isDropdownOpen: boolean = false;
  loggedInName!: string;

  constructor(private auth: AuthService){ 
  }

  ngOnInit(): void {
    this.loggedInName = this.auth.getLoggedInUserName();
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.auth.logout();
  }
}
