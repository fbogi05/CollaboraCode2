import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { NgForm } from '@angular/forms';
import { Subscription, fromEvent, map, merge, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
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
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(private base: BaseService, private router: Router) {}

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

  changeVisibility() {
    this.fieldData.password.visible = !this.fieldData.password.visible;
    this.fieldData.password.icon = this.base.getPasswordIcon(
      this.fieldData.password.visible
    );
  }

  getFieldState() {
    return this.fieldData.password.visible ? 'text' : 'password';
  }

  checkCredentials() {
    let canLogIn = true;

    if (this.fieldData.email.value === 'user@example.com')
      this.fieldData.email.valid = true;
    else this.fieldData.email.valid = false;
    if (this.fieldData.password.value === 'Almafa12;')
      this.fieldData.password.valid = true;
    else this.fieldData.password.valid = false;

    canLogIn = this.fieldData.email.valid && this.fieldData.password.valid;

    return canLogIn;
  }

  login(form: NgForm) {
    let authenticated = this.checkCredentials();
    if (form.valid && authenticated) {
      this.router.navigate(['/home']);
    }
  }
}
