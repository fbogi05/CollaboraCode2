import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fieldData = {
    password: {
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
    passwordAgain: {
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
  };

  constructor(private base: BaseService, private router: Router) {}

  changeVisibility(field: string) {
    if (field === 'password') {
      this.fieldData.password.visible = !this.fieldData.password.visible;
      this.fieldData.password.icon = this.base.getPasswordIcon(
        this.fieldData.password.visible
      );
    } else if (field === 'passwordAgain') {
      this.fieldData.passwordAgain.visible = !this.fieldData.passwordAgain.visible;
      this.fieldData.passwordAgain.icon = this.base.getPasswordIcon(
        this.fieldData.passwordAgain.visible
      );
    }
  }

  getFieldState(field: string) {
    if (field === 'password')
      return this.fieldData.password.visible ? 'text' : 'password';
    else if (field === 'passwordAgain')
      return this.fieldData.passwordAgain.visible ? 'text' : 'password';
    else return 'text';
  }

  register() {
    this.router.navigate(['/home']);
  }
}
