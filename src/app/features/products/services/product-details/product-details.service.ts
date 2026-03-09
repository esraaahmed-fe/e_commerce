import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ProductDetailsresponse } from '../../models/product-details/product-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient=inject(HttpClient)
  getSpecificProduct(id:string|null):Observable<ProductDetailsresponse>{
    return this.httpClient.get<ProductDetailsresponse> (environment.base_url+`products/${id}`)
  }
}
