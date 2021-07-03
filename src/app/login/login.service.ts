import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(email:any="",password:any="") {
    var data = {
        "email": email,
        "password": password
    };
  	return this.http.post("https://directory-api-node.herokuapp.com/api/auth/login", data);
  }


}
