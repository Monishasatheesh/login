import { Component, OnInit,TemplateRef  } from '@angular/core';
import { AboutService } from './about.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import  Swal from 'sweetalert2';
import  { Router } from '@angular/router';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	field:any="";
	modalRef: BsModalRef;
	modalRef1: BsModalRef;
	isactive:any;
	submitted=false;
	users:any;



  constructor(private api: AboutService,private modalService: BsModalService,private router:Router ) { }

  ngOnInit(): void {
  	this.fetch();

  }
   
   fetch(){
   this.api.getusers().subscribe((response:any)=>{
         this.field=response;
         console.log(response);
     });  
}

//addnew
    openModal(template: TemplateRef<any>) {
    this.users={name:"",email:"",isactive:1};
    	
    this.modalRef = this.modalService.show(template);

  }

//edit
  openModal1(template: TemplateRef<any>,id:any) {
   
    this.modalRef1 = this.modalService.show(template);
    this.api.getuser(id).subscribe((response:any)=>{
        this.users=response;
    });
  }


  delete(id:any){

    Swal.fire({
      title: 'Are you sure want to remove?',

      text: 'You will not be able to recover this file!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'
    }).then(result=>{

         if(result.value){
  	this.api.delete(id).subscribe((response:any)=>{
        Swal.fire("deleted");
        this.fetch();
  	     });
  }
  });
  }

  save(){
  	
  	this.api.save(this.users).subscribe((response:any)=>{
      console.log(response);
      this.fetch();
      this.modalRef.hide();
      Swal.fire("Added");
      
  	});
  }


  update(id:any,users:any){
    
   // users.isactive = parseInt(users.isactive);

    this.api.putuser(id,users).subscribe((response:any)=>{
      alert("updated");
      this.fetch();
      this.modalRef1.hide();
    });

  }
//checkbox
  active(event:any){
  	console.log(event);
  	this.users.isactive = event.target.checked ? 1: 0; 


  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }


}
