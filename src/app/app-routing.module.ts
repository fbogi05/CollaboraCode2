import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeAfterComponent } from './home-after/home-after.component';
import { ProfilComponent } from './profil/profil.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditorComponent } from './editor/editor.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { HomeComponent } from './home/home.component';
import { FilesComponent } from './files/files.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"nav", component:NavComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"home", component:HomeAfterComponent},
  {path:"profil", component:ProfilComponent},
  {path:"projects", component:ProjectsComponent},
  {path: "files/:id", component:FilesComponent},
  {path: "files", component:FilesComponent},
  {path:"editor", component:EditorComponent},
  {path:"add-people", component:AddPeopleComponent},
  {path:"", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
