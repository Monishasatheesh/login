import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

 getsubmit(order:any){
 	return this.http.post("http://localhost:3000/order/",order);
 }

 
}
