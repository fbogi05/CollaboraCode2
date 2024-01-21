import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeAfterComponent } from './home-after/home-after.component';
import { FooterComponent } from './footer/footer.component';
import { HomeBeforeComponent } from './home-before/home-before.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    HomeAfterComponent,
    FooterComponent,
    HomeBeforeComponent,
    ProfilComponent,
    ProjectsComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
