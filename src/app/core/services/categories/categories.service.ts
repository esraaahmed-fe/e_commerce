import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Categoriesresponse } from '../../models/categories/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient=inject(HttpClient);
  getAllCategories():Observable<Categoriesresponse>{
     return this.httpClient.get<Categoriesresponse>(environment.base_url+'categories')
  }


}
