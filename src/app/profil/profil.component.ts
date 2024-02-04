import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  isDropdownOpen: boolean = false;

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
