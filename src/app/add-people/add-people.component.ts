import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.css'
})
export class AddPeopleComponent {

  constructor(private backendService: BackendService){  }

  addUser(email: string){
      this.backendService.addUser(email).subscribe(() => {
        alert("Felhasználó sikeresen hozzáadva");
      })
  }
}
