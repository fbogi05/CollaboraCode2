import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { EditorComponent } from './editor/editor.component';
import { FooterComponent } from './footer/footer.component';
import { HomeAfterComponent } from './home-after/home-after.component';
import { HomeBeforeComponent } from './home-before/home-before.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ProfilComponent } from './profil/profil.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { NavAfterComponent } from './nav-after/nav-after.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddPeopleComponent,
    EditorComponent,
    FooterComponent,
    HomeAfterComponent,
    HomeBeforeComponent,
    LoginComponent,
    NavComponent,
    ProfilComponent,
    ProjectsComponent,
    SignUpComponent,
    HomeComponent,
    NavAfterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
