import { Component } from '@angular/core';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.css'
})
export class AddPeopleComponent {

  isDropdownOpen: boolean = false;

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
