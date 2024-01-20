import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthModel } from "./auth-model";

@Injectable({providedIn:"root"})

export class AuthService{

    constructor(private http: HttpClient){}

    signupUser(firstName: string, lastName: string, email: string, password: string){

        const authData: AuthModel = {firstName, lastName, email, password}
        this.http.post('http://localhost:3000/signup', authData).subscribe(res =>{
            console.log(res);
        })
    }
}