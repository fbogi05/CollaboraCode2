import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HomeAfterComponent } from './home-after/home-after.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"nav", component:NavComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"", component:HomeComponent},
  {path:"home", component:HomeAfterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
