import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  first_name: string = '';
  last_name: string = '';

  constructor(private backendService: BackendService, private auth:AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const token: string = this.auth.getToken()!;
    this.userService.getUserData(token).subscribe({
      next: (user:any) => {
        this.first_name = user.firstName;
        this.last_name = user.lastName;
      },
      error: (error: any) => {
        console.error('Hiba a felhasználói adatok lekérése közben: ', error);
      }
      });
  }

  deleteAccount(){
    const token: string = this.auth.getToken()!;
    if(confirm('Biztosan törölni akarja a fiókját?')){
      this.backendService.deleteAccount(token).subscribe({
        next: (response) => {
          console.log('Fiók sikeresen törölve: ', response);
          this.router.navigate(['/']);
        }
      });
    }
  }

}
