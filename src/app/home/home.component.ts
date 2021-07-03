import { Component, OnInit ,TemplateRef} from '@angular/core';
import { HomeService } from './home.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
field:any;
 modalRef: BsModalRef;
 modalRef1: BsModalRef;
 post:any="";
 success=false;
 submitted=false;
 

 


  constructor(
  	private service:HomeService,
  	private modalService: BsModalService,
    private router: Router,
   
  ) {}
  ngOnInit(): void {  
  this.fetchPosts();
}

   fetchPosts(){
   	this.service.getposts().subscribe((response:any)=>{
         this.field=response;
    })
   }

   delete(id:any){
     Swal.fire({

      title: 'Are you sure want to remove?',

      text: 'You will not be able to recover this file!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'

    }).then(result =>{
        if(result.value){
    
   	this.service.delete(id).subscribe((response:any)=>{
        Swal.fire("deleted");
        this.fetchPosts();
   	    });
   }
   
   })
   }
   openModal(template: TemplateRef<any>) {
   	this.submitted=false;
   	this.post={title:"",body:""};
    this.modalRef = this.modalService.show(template);

  }
  openModal1(template: TemplateRef<any>,id:any) {

  	this.service.getpost(id).subscribe((response:any)=>{
  		this.post=response;
        
    });

    this.modalRef1 = this.modalService.show(template);
  }
  save(){
  	 this.submitted=true;
  	if(this.post.title!="" && this.post.body!="")
  	{
  	console.log(this.post);
  	this.service.save(this.post)
      .subscribe((response:any) => {

        console.log(response);
        this.fetchPosts();
          this.post="";
         
        this.success=true;

    });} 	
      }
     update(id:any,post:any){
     	this.service.putpost(id,post).subscribe((response:any) => {
             console.log(response);
             this.fetchPosts();
       
             this.modalRef1.hide();

       
     })

  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

 
}


     



    
