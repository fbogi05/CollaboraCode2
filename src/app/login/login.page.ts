import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  fieldData = {
    email: {
      value: '',
      valid: true,
    },
    password: {
      value: '',
      valid: true,
      icon: this.baseService.iconPaths.password.passwordHidden,
      visible: false,
    },
  };
  allowLogIn = true;

  constructor(
    private baseService: BaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  changeVisibility() {
    this.fieldData.password.visible = !this.fieldData.password.visible;
    this.fieldData.password.icon = this.baseService.getPasswordIcon(
      this.fieldData.password.visible
    );
  }

  getPasswordVisible() {
    return this.fieldData.password.visible ? 'text' : 'password';
  }

  resetFieldStates(fieldName: string) {
    if (fieldName === 'email') {
      this.fieldData.email.valid = true;
      this.fieldData.password.valid = this.allowLogIn
        ? this.fieldData.password.valid
        : true;
    } else if (fieldName === 'password') {
      this.fieldData.password.valid = true;
      this.fieldData.email.valid = this.allowLogIn
        ? this.fieldData.email.valid
        : true;
    }
    this.allowLogIn = true;
  }

  checkCredentials() {
    if (this.fieldData.email.value === '') this.fieldData.email.valid = false;
    else this.fieldData.email.valid = true;
    if (this.fieldData.password.value === '')
      this.fieldData.password.valid = false;
    else this.fieldData.password.valid = true;

    this.authService
      .login(this.fieldData.email.value, this.fieldData.password.value)
      .subscribe({
        next: (data) => {
          const body: any = data.body;
          console.log(body);

          if (body.token) {
            this.authService.setToken(body.token);
            this.allowLogIn = true;
          } else {
            this.allowLogIn = false;
          }
        },
        error: (error) => {
          console.log(error.error.message);
          this.allowLogIn = false;
        },
      });

    if (this.fieldData.email.valid && this.fieldData.password.valid) {
      if (!this.allowLogIn) {
        this.fieldData.email.valid = false;
        this.fieldData.password.valid = false;
      }
    }

    return this.allowLogIn;
  }

  login(form: NgForm) {
    const authenticated = this.checkCredentials();
    if (form.valid && authenticated) {
      this.router.navigate(['tabs/home']);
    }
  }
}
