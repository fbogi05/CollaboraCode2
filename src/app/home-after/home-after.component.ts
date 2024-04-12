import { Component } from '@angular/core';

@Component({
  selector: 'app-home-after',
  templateUrl: './home-after.component.html',
  styleUrl: './home-after.component.css'
})
export class HomeAfterComponent {

  isDropdownOpen: boolean = false;

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
