import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http:HttpClient) { }
   
  getposts(){

   return this.http.get("http://localhost:3000/posts");
     
   }
   delete(id:any){
   	return this.http.delete(" http://localhost:3000/posts/"+id);
   }
   save(post:any){
  
   	return this.http.post("http://localhost:3000/posts",post);
   }
  
   getpost(id:any){
   	return this.http.get("http://localhost:3000/posts/"+id);
   }
   putpost(id:any,post:any){
   	return this.http.put("http://localhost:3000/posts/"+id,post);
   }

}
