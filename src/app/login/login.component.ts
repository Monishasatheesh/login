import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	submitted = false;
	users:any={
    email:"", password:""
  };
	success=false;
	error=false;
  errorMessage = "";
  successMessage="";
  

  constructor(private api:LoginService,private router: Router) { }
  
  ngOnInit(): void {
  }
  login(){
  	this.success=false;
  	this.error=false;
  	this.submitted=true;
    this.errorMessage = "";
    
   
   
  	if(this.users.email!='' && this.users.password!='')
  		this.api.login(this.users.email,this.users.password).subscribe((response:any)=>{
  			console.log(response.status);
        localStorage.token=response.access_token;
       localStorage.user=response.user;
       localStorage.id=response.user.id;
       localStorage.email=response.user.email;
      
      
        this.router.navigate(['/home']);


  		}, error => {
        this.error=true;
        console.log(error.status);
        this.errorMessage = "Login Failed";
      });


}}
