import { Component, inject, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Categories } from '../../../../core/models/categories/categories.interface';
import { Product } from '../../../../core/models/products/product.interface';
import { SplitPipe } from '../../../pipes/split-pipe';
import { CartService } from '../../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink,SplitPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
@Input() cardproduct:Product={} as Product;
private readonly cartService=inject(CartService);
private readonly   toastrService = inject(ToastrService);
addProductItemToCart(id:string):void{
this.cartService.addProductTocart(id).subscribe({
   next:(res)=>{
   if(res.status==='success'){
    this.cartService.cartCount.set(res.numOfCartItems)
this.toastrService.success(res.message,"freshcart")
   }
      },
         error:(err)=>{
        console.log(err);

      },
})
}

}
