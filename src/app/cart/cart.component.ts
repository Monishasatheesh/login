import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
modalRef: BsModalRef;
modalRef1: BsModalRef;
item:any={fooditem:"",price:"",quantity:1,total:"0.00"};
submitted=false;
cart:any=[];
order:any={
  order_no:"",
  payment_method:"Cash",
  customer:"",
  grand_total:"",
  cart:[]
};
submitted2=false;


  constructor(private modalService: BsModalService,private api:CartService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
 this.item={fooditem:"",price:"",quantity:1,total:"0.00"};

    this.modalRef = this.modalService.show(template);

  }

  openModal1(template: TemplateRef<any>,field:any) {
    this.item=field;
    this.modalRef1 = this.modalService.show(template);
    
  }

  calculatePrice(){
    this.item.total=this.item.price * this.item.quantity;
  }
  save(){
  	this.submitted=true;
  	if(this.item.fooditem!='' && this.item.price!=''&&this.item.quantity!=""){
  		this.cart.push({
  		id: this.cart.length+1,
        fooditem: this.item.fooditem,
        price:this.item.price,
        quantity:this.item.quantity,
        total:this.item.total
      });
        this.submitted=false;
        this.modalRef.hide();
        this.grand_total();
  	}
  }

  delete(id:any) {
    this.cart = this.cart.filter(function (b:any) {
    	alert("deleted");
      return b.id != id;
    });
  }

  
  update(item:any){
   
   this.cart=this.cart.map(function (b:any) {
     if(b.id==item.id){
       return {
         id: item.id,
        fooditem: item.fooditem,
        price:item.price,
        quantity:item.quantity,
        total:item.total,
       };
     
     }

     return b;

   });
   this.modalRef1.hide();
   this.grand_total();

  }

  grand_total(){
    let total=0.0;
    this.cart.map(function (b:any) {
     total= total+b.total;
    });
    console.log(total);
    this.order.grand_total=total;
  }

  submit(){
    this.submitted2=true;
    //alert(JSON.stringify(this.order));
    if( this.order.order_no!='' && this.order.payment_method!='' && this.order.customer!='' && 
      this.order.grand_total!=''){

      this.order.cart=this.cart;
    this.api.getsubmit(this.order).subscribe((response:any)=>{  
    
    this.toastr.success('Submitted Sucessfully!..');


    this.order={
  order_no:"",
  payment_method:"Cash",
  customer:"",
  grand_total:"",
  cart:[]
};
  this.cart=[];
  this.submitted2=false;

  });
     
      }   
    }
  }
