import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent {

  constructor(private auth: AuthService, private router: Router) { }
  
  logout() {
    this.auth.setAuthenticated(false);
    this.router.navigate(['login']);
  }

}
