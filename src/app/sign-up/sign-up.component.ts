import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.auth.signUp(
      this.registerForm.get('firstName')!.value,
      this.registerForm.get('lastName')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value
    );
  }

}
