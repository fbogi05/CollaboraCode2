import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  password: string = '';

  constructor(private backendService: BackendService, private auth:AuthService) { }

  ngOnInit(): void {
    const token: string = this.auth.getToken()!;
    this.backendService.getAccountInfo(token).subscribe({
      next: (user:any) => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      },
      error: (error: any) => {
        console.error('Hiba a felhasználói adatok lekérése közben: ', error);
      }
      });
  }

  saveUserData() {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
    this.backendService.modifyUser(user, this.auth.getToken()!)
      .subscribe(response => {
        console.log('Felhasználói adatok sikeresen frissítve: ', response);
        alert('Adatok sikeresen frissítve!');
      }, error => {
        console.error('Hiba az adatok frissítése közben: ', error);
        alert('Az adatok frissítése sikertelen!');
      });
  }


  deleteAccount(){
    const token: string = this.auth.getToken()!;
    if(confirm('Biztosan törölni akarja a fiókját?')){
      this.backendService.deleteAccount(token).subscribe({
        next: (response) => {
          console.log('Fiók sikeresen törölve: ', response);
          window.location.replace('/');
        }
      });
    }
  }

}
