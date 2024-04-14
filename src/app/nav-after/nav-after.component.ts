import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrl: './nav-after.component.css'
})
export class NavAfterComponent implements OnInit{

  isDropdownOpen: boolean = false;
  firstName:string = '';

  constructor(private auth: AuthService, private backendService: BackendService){ }

  ngOnInit(): void {
    const token = this.auth.getToken()!;
    this.backendService.getAccountInfo(token).subscribe({
      next: (user:any) => {
        this.firstName = user.firstName;
      }
    });
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.auth.logout();
  }
}
