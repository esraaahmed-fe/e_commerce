import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ɵEmptyOutletComponent } from "@angular/router";
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { Product } from '../../core/models/products/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/components/card/card/card.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { PopularProductsComponent } from '../home/popular-products/popular-products.component';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-products',
  imports: [PopularProductsComponent, ɵEmptyOutletComponent, NgxPaginationModule, CardComponent,SearchPipe,FormsModule,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService)

  productList: WritableSignal<Product[]> = signal<Product[]>([])
  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0
  }
  text:string=""
  ngOnInit(): void {

    this.getAllProducts()
  }
  getAllProducts():void{

      this.productsService.getAllProducts(this.pagination.currentPage,this.pagination.itemsPerPage).subscribe({
      next: (res) => {

        console.log(res);
        this.productList.set(res.data)
this.pagination.totalItems =res.results;
      },
      error: (err) => {

        console.log(err);

      },

    })
  }
  pageChanged(page:number):void{
this.pagination.currentPage =page;
this.getAllProducts();
  }
}
