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
    email: {
      text: '',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$',
    },
    password: {
      text: '',
      pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,16}$',
      hasNumbersPattern: '(?=.*[0-9])',
      hasLowercasePattern: '(?=.*[a-z])',
      hasUppercasePattern: '(?=.*[A-Z])',
      hasSpecialCharsPattern: '(?=.*[\\W])',
      lengthPattern: '.{8,16}',
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
