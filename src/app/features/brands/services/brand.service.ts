import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Brandsresponse } from '../models/brands/brands.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
    private readonly httpClient=inject(HttpClient);
  getAllCategories():Observable<Brandsresponse>{
     return this.httpClient.get<Brandsresponse>(environment.base_url+'brands')
  }
}
