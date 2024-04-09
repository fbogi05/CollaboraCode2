import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

  ngOnInit() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

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

  async checkCredentials() {
    if (this.fieldData.email.value === '') this.fieldData.email.valid = false;
    else this.fieldData.email.valid = true;
    if (this.fieldData.password.value === '')
      this.fieldData.password.valid = false;
    else this.fieldData.password.valid = true;

    await this.authService
      .login(this.fieldData.email.value, this.fieldData.password.value)
      .subscribe({
        next: (data) => {
          const body: any = data.body;

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

  async login(form: NgForm) {
    const authenticated = this.checkCredentials();
    if (form.valid && (await authenticated)) {
      this.router
        .navigate(['tabs/home'])
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
