import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.css'
})
export class AddPeopleComponent {

  public emailForm!: FormGroup;

  constructor(private backendService: BackendService){  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('')
    });
  }

  addUser(){
      this.backendService.addUser(this.emailForm.get('email')!.value).subscribe(() => {
        alert("Felhasználó sikeresen hozzáadva");
      })
  }
}
