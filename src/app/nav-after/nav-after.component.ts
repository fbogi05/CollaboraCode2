import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent {
  
  isDropdownOpen: boolean = false;

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
