import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../core/models/products/product.interface';
import { ProductsService } from '../../../core/services/products/products.service';
import { CardComponent } from '../../../shared/components/card/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent,TranslatePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit  {

 private readonly productsService=inject(ProductsService)

  productList:WritableSignal<Product[]>=signal<Product[]>([])
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList.set(res.data)

      },
      error:(err)=>{
        console.log(err);

      },

    })
  }
}
