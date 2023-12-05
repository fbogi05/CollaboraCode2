import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private dialogRef:MatDialog) {}

  openLoginDialog(){
    this.dialogRef.open(LoginComponent);
  }

  openRegDialog(){
    this.dialogRef.open(SignUpComponent);
  }
}
