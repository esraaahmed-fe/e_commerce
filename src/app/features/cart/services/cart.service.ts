
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

import { Allorders } from '../../allorders/models/allorders.interface';
import { CartDataResponse } from '../models/cart-data.interface';
import { CartDetailsresponse } from '../models/cart-details.interface';
import { PaynentDetailsresponse } from '../models/paynent-details.interface';



@Injectable({
  providedIn: 'root',
})
export class CartService {
      private readonly httpClient=inject(HttpClient);
cartCount:WritableSignal<number>=signal<number>(0);

  updateCartCount(data: any): void {
    const total = data.products.reduce(
      (sum: number, item: any) => sum + item.count, 0
    );
    this.cartCount.set(total);
  }

  addProductTocart(id:string):Observable<CartDataResponse>{
     return this.httpClient.post<CartDataResponse>(environment.base_url+'cart',
      {
        productId:id
      },

     )

  }
  getLogeedUserCart():Observable<CartDetailsresponse>{
       return this.httpClient.get<CartDetailsresponse>(environment.base_url+'cart',)
  }
  removeProductFromCart(id:string):Observable<CartDetailsresponse>{
       return this.httpClient.delete<CartDetailsresponse>(environment.base_url+`cart/${id}`,)
  }
  updateCartProductQuantity(id:string,count:number):Observable<CartDetailsresponse>{
       return this.httpClient.put <CartDetailsresponse>(environment.base_url+`cart/${id}`,
        {
  count:count,
        },

      )
  }
 checkOutSection(cartId:string|null,checkoutData:object):Observable<PaynentDetailsresponse>{
       return this.httpClient.post <PaynentDetailsresponse>(environment.base_url+`orders/checkout-session/${cartId}?url=http://localhost:4200`,

checkoutData,


      )
  }
showAllOrders(userId: string | null): Observable<Allorders> {
  return this.httpClient.get<Allorders>(
    environment.base_url + `orders/user/${userId}`
  );
}
 payWithCash(cartId:string|null,checkoutData:object):Observable<any>{
       return this.httpClient.post <any>(environment.base_url+`orders/${cartId}`,

checkoutData,


      )
  }

}

