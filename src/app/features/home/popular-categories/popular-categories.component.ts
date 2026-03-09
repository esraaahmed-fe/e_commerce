import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from '../../../core/models/categories/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule,TranslatePipe],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService);
  private readonly translateService =inject(TranslateService)
  categoriesList:WritableSignal<Categories[]>=signal<Categories[]>([])
ngOnInit(): void {
  this.onLanguageChange();
this.getAllCategoriesData();

}
getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
this.categoriesList.set(res.data)
    },
    error:(err)=>{
      console.log(err);

    },
  })
}
onLanguageChange():void{
   this.translateService.onLangChange.subscribe({
  next:(res)=>{
    this.categoriescustomOptions={
...this.categoriescustomOptions,rtl:res.lang==='ar'?true:false
    }


  }
 })
}
categoriescustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      },


    },
    nav: false,
    rtl: this.translateService.getCurrentLang()==="ar"?true:false,
  }
  }
