import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productresponse } from '../../models/products/product.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient=inject(HttpClient)
  getAllProducts(page:number=1 ,limit:number=40):Observable<Productresponse>{
    return this.httpClient.get<Productresponse>(environment.base_url+`products?page=${page}&limit=${limit}`)
  }
}
