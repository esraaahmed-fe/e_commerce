import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnInit {
private readonly translateService =inject(TranslateService)
ngOnInit(): void {
this.onLangChange();
}
onLangChange():void{
   this.translateService.onLangChange.subscribe({
  next:(res)=>{
    this.mainSlidercustomOptions={
...this.mainSlidercustomOptions,rtl:res.lang==='ar'?true:false
    }


  }
 })
}
  mainSlidercustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: false,
    rtl:this.translateService.getCurrentLang()==="ar"?true:false,
  }
}
