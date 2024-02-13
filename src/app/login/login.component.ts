import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveService } from '../active.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  })

  constructor(private active: ActiveService) {}

  get isLoggedIn(){
    return this.active.isLoggedIn;
  }

  login(){
    this.active.login();
  }


}
