import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from'../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

//ALLUSRS
  getusers(){
  	return this.http.get("http://localhost:3000/users");
  }
//delete
  delete(id:any){
  	return this.http.delete("http://localhost:3000/users/"+id);

  }
//ADDNEW
  save(users:any){
  	return this.http.post("http://localhost:3000/users/",users);
  }
//EDIT
  getuser(id:any){
  	return this.http.get("http://localhost:3000/users/"+id);
  }
//UPDATE
  putuser(id:any,users:any){
  	return this.http.put("http://localhost:3000/users/"+id,users);
  }

}
