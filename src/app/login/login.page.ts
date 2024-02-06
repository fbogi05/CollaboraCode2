import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  fieldData = {
    password: {
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
  };
  titlePosition = 0;

  constructor(private base: BaseService, private router: Router) {}

  changeVisibility() {
    this.fieldData.password.visible = !this.fieldData.password.visible;
    this.fieldData.password.icon = this.base.getPasswordIcon(
      this.fieldData.password.visible
    );
  }

  getFieldState() {
    return this.fieldData.password.visible ? 'text' : 'password';
  }

  login() {
    this.router.navigate(['/home']);
  }
}
