import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  fieldData = {
    firstName: {
      value: '',
    },
    lastName: {
      value: '',
    },
    email: {
      value: '',
    },
    password: {
      value: '',
      icon: this.baseService.iconPaths.password.passwordHidden,
      visible: false,
    },
  };

  constructor(
    private baseService: BaseService,
    private authService: AuthService  ) {}

  ngOnInit() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.setFieldValues();
  }

  setFieldValues() {
    this.baseService.getAccountInformation().subscribe((accountData: any) => {
      this.fieldData.firstName.value = accountData.firstName;
      this.fieldData.lastName.value = accountData.lastName;
      this.fieldData.email.value = accountData.email;
    });
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

  updateAccount() {
    this.baseService
      .updateAccountInformation(
        this.fieldData.firstName.value,
        this.fieldData.lastName.value,
        this.fieldData.email.value,
        this.fieldData.password.value
      )
      .subscribe();
  }

  deleteAccount() {
    this.baseService.deleteAccount().subscribe(() => {
      this.authService.logout(true);
    });
  }
}
