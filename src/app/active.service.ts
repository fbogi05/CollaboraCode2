import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  isLoggedIn: boolean = false;

login(){
  this.isLoggedIn = true;
}

logout(){
  this.isLoggedIn = false;
}

  constructor() { }
}
