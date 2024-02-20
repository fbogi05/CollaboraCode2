import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { NgForm } from '@angular/forms';
import { Subscription, fromEvent, map, merge, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
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
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
    passwordAgain: {
      value: '',
      valid: true,
      icon: this.base.iconPaths.password.passwordHidden,
      visible: false,
    },
  };
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkNetworkStatus();
  }

  ngOnDestroy() {
    this.networkStatus$.unsubscribe();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
      });
  }

  constructor(private base: BaseService, private router: Router) {}

  changeVisibility(field: string) {
    if (field === 'password') {
      this.fieldData.password.visible = !this.fieldData.password.visible;
      this.fieldData.password.icon = this.base.getPasswordIcon(
        this.fieldData.password.visible
      );
    } else if (field === 'passwordAgain') {
      this.fieldData.passwordAgain.visible =
        !this.fieldData.passwordAgain.visible;
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

  validateData() {
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
  }

  register(form: NgForm) {
    this.validateData();
    if (form.valid) {
      this.router.navigate(['/home']);
    }
  }
}
