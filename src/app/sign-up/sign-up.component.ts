import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
      password_confirmation: new FormControl('', [Validators.required, this.passwordsMatchValidator()]),
    });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const password_confirmation = control.get('password_confirmation');
      if (password && password_confirmation && password.value !== password_confirmation.value) {
        return { passwordsNotMatching: true };
      }
      return null;
    };
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { firstName, lastName, email, password, password_confirmation } = this.registerForm.value;

    this.auth.signUp(firstName, lastName, email, password, password_confirmation);
  }

}
