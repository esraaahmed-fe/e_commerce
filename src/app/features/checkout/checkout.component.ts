
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { SplitPipe } from '../../shared/pipes/split-pipe';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe,SplitPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly formBuilder=inject(FormBuilder);
  private readonly cartService=inject(CartService);
    private readonly toastrService=inject(ToastrService);
  private readonly router=inject(Router);

  cartId:string|null=null;
ngOnInit(): void {
  this.checkOutFormInt();
this.getCartId();
}

getCartId():void{
    this.activatedRoute.paramMap.subscribe({
    next:(urlparams)=>{
      this.cartId=urlparams.get('id')

    }
  })
}
checkOutForm!:FormGroup;
checkOutFormInt():void{
  this.checkOutForm=this.formBuilder.group({
shippingAddress:this.formBuilder.group({
  details:[null,Validators.required],
  phone:[null,[Validators.required,Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]],
  city:[null,Validators.required],
})
})
}

onSubmitCheckOutForm():void{
  if( this.checkOutForm.valid){
this.cartService.checkOutSection(this.cartId,this.checkOutForm.value).subscribe({

    next:(res)=>{
if(res.status==='success'){
window.open(res.session.url,'_self')

}


   },
    error:(err)=>{
        console.log(err);
    }
})

  }
}
onSubmitCheckOutFormCash():void{
  if( this.checkOutForm.valid){


this.cartService.payWithCash(this.cartId,this.checkOutForm.value).subscribe({


    next:(res)=>{


if(res.status==='success'){
    this.toastrService.success('paying cash','Fresh Cart!');


this.router.navigate(['allorders'])

}


   },
    error:(err)=>{
        console.log(err);
    }
})

  }
}


}
