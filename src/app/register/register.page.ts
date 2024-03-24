import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fieldData = {
    firstName: {
      value: '',
      valid: true,
    },
    lastName: {
      value: '',
      valid: true,
    },
    email: {
      value: '',
      valid: true,
      pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    },
    password: {
      value: '',
      valid: true,
      pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$',
      hasNumbersPattern: '(?=.*[0-9])',
      hasLowercasePattern: '(?=.*[a-z])',
      hasUppercasePattern: '(?=.*[A-Z])',
      lengthPattern: '^.{8,16}$',
      icon: this.baseService.iconPaths.password.passwordHidden,
      visible: false,
    },
    passwordAgain: {
      value: '',
      valid: true,
      icon: this.baseService.iconPaths.password.passwordHidden,
      visible: false,
    },
  };
  allowRegister = false;

  constructor(
    private baseService: BaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  changeVisibility(field: string) {
    if (field === 'password') {
      this.fieldData.password.visible = !this.fieldData.password.visible;
      this.fieldData.password.icon = this.baseService.getPasswordIcon(
        this.fieldData.password.visible
      );
    } else if (field === 'passwordAgain') {
      this.fieldData.passwordAgain.visible =
        !this.fieldData.passwordAgain.visible;
      this.fieldData.passwordAgain.icon = this.baseService.getPasswordIcon(
        this.fieldData.passwordAgain.visible
      );
    }
  }

  getPasswordVisible(field: string) {
    if (field === 'password')
      return this.fieldData.password.visible ? 'text' : 'password';
    else if (field === 'passwordAgain')
      return this.fieldData.passwordAgain.visible ? 'text' : 'password';
    else return 'text';
  }

  checkCredentials() {
    let allowRegister = false;

    if (this.fieldData.firstName.value !== '')
      this.fieldData.firstName.valid = true;
    else this.fieldData.firstName.valid = false;
    if (this.fieldData.lastName.value !== '')
      this.fieldData.lastName.valid = true;
    else this.fieldData.lastName.valid = false;
    if (
      this.fieldData.email.value !== '' &&
      this.fieldData.email.value.match(this.fieldData.email.pattern)
    )
      this.fieldData.email.valid = true;
    else this.fieldData.email.valid = false;
    if (
      this.fieldData.password.value !== '' &&
      this.fieldData.passwordAgain.value.match(this.fieldData.password.pattern)
    )
      this.fieldData.password.valid = true;
    else this.fieldData.password.valid = false;
    if (
      this.fieldData.passwordAgain.value !== '' &&
      this.fieldData.passwordAgain.value === this.fieldData.password.value
    )
      this.fieldData.passwordAgain.valid = true;
    else this.fieldData.passwordAgain.valid = false;

    this.authService
      .register(
        this.fieldData.firstName.value,
        this.fieldData.lastName.value,
        this.fieldData.email.value,
        this.fieldData.password.value,
        this.fieldData.passwordAgain.value
      )
      .subscribe({
        next: (data) => {
          const body: any = data.body;
          if (body.token) {
            this.authService.setToken(body.token);
            allowRegister = true;
          } else {
            allowRegister = false;
          }
        },
        error: (error) => {
          console.log(error.error.messages);
          allowRegister = false;
        },
      });

    return allowRegister;
  }

  register(form: NgForm) {
    const authenticated = this.checkCredentials();
    if (form.valid && authenticated) {
      this.router.navigate(['tabs/home']);
    }
  }
}
