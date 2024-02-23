import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { NgForm } from '@angular/forms';

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
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
  };
  canLogIn = true;

  constructor(private base: BaseService, private router: Router) {}

  changeVisibility() {
    this.fieldData.password.visible = !this.fieldData.password.visible;
    this.fieldData.password.icon = this.base.getPasswordIcon(
      this.fieldData.password.visible
    );
  }

  getPasswordVisible() {
    return this.fieldData.password.visible ? 'text' : 'password';
  }

  resetFieldStates(fieldName: string) {
    if (fieldName === 'email') {
      this.fieldData.email.valid = true;
      this.fieldData.password.valid = this.canLogIn
        ? this.fieldData.password.valid
        : true;
    } else if (fieldName === 'password') {
      this.fieldData.password.valid = true;
      this.fieldData.email.valid = this.canLogIn
        ? this.fieldData.email.valid
        : true;
    }
    this.canLogIn = true;
  }

  checkCredentials() {
    if (this.fieldData.email.value === '') this.fieldData.email.valid = false;
    else this.fieldData.email.valid = true;
    if (this.fieldData.password.value === '')
      this.fieldData.password.valid = false;
    else this.fieldData.password.valid = true;

    this.canLogIn =
      this.fieldData.email.value === 'user@example.com' &&
      this.fieldData.password.value === 'Almafa12;';

    if (this.fieldData.email.valid && this.fieldData.password.valid) {
      if (!this.canLogIn) {
        this.fieldData.email.valid = false;
        this.fieldData.password.valid = false;
      }
    }

    return this.canLogIn;
  }

  login(form: NgForm) {
    let authenticated = this.checkCredentials();
    if (form.valid && authenticated) {
      this.router.navigate(['/home']);
    }
  }
}
