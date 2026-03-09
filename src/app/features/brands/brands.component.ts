import { TranslatePipe } from '@ngx-translate/core';
import { Brands } from './models/brands/brands.interface';
import { BrandService } from './services/brand.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
private readonly brandService=inject(BrandService);
  brandsList:WritableSignal<Brands[]>=signal<Brands[]>([])
ngOnInit(): void {
this.getAllCategoriesData();
}
getAllCategoriesData():void{
    this.brandService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
this.brandsList.set(res.data)
    },
    error:(err)=>{
      console.log(err);

    },
  })
}
}
