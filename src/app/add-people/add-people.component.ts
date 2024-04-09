import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.css'
})
export class AddPeopleComponent {

  public emailForm!: FormGroup;

  constructor(private backendService: BackendService, private auth: AuthService){  
    // this.backendService.getProjectInfo(this.auth.getToken()!).subscribe(
    //   (project: any) => {
    //     const projectId = project.project_id;
    //   }
    // )
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      user_email: new FormControl('')
    });
  }

  addUser(){
    const token: string = this.auth.getToken()!;
    let project_id = 2;
      this.backendService.addUser(this.emailForm.get('user_email')!.value, project_id, token).subscribe({
        next: response => {
          alert("Szerkesztő sikeresen hozzáadva");
          console.log("Szerkesztő sikeresen hozzáadva: ", response);
        },
        error: error => {
          console.error("Szerkesztő hozzáadása sikertelen: ", error)
        }
      });
  }
}
