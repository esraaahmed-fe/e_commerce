 import { Component, computed, inject, Input, input, PLATFORM_ID, Renderer2, signal, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/authentication/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { STORED_KEY } from '../../../core/constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
// ---------- Interface ----------
interface Language {
  code: string;
  name: string;

}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

@Input({required:true})islogin!:boolean;

private readonly flowbiteService=inject(FlowbiteService);
private readonly authService=inject(AuthService);
private readonly cartService=inject(CartService);
private readonly renderer=inject(Renderer2);
private readonly  translateService=inject(TranslateService);
private readonly plate_id=inject(PLATFORM_ID);
count:Signal<number>=computed(()=>this.cartService.cartCount()) ;
  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();

    });
if(isPlatformBrowser(this.plate_id)){
  const token=localStorage.getItem(STORED_KEY.userToken)
if(token){
    this.getAllCartData();
}
}


    }
     getAllCartData():void{
      this.cartService.getLogeedUserCart().subscribe({
        next:(res)=>{
this.cartService.cartCount.set(res.numOfCartItems)




        },

      })
  }
  singnOut():void{
    this.authService.userLogOut()
  }
//translate lang
  isOpen = signal<boolean>(false);
  private _currentLang = signal<Language>({ code: this.translateService.getCurrentLang(), name: 'English' });
  public get currentLang() {
    return this._currentLang;
  }
  public set currentLang(value) {
    this._currentLang = value;
  }

  // ---------- Data ----------
  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  // ---------- Methods ----------
  toggleDropdown(): void {
    this.isOpen.update((value) => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(lang: Language): void {
    this.currentLang.set(lang);
    this.closeDropdown();
    this.translateService.use(lang.code );
    this.renderer.setAttribute(document.documentElement,"lang",lang.code)
    this.renderer.setAttribute(document.documentElement,'dir',lang.code==='en' ?'ltr': 'rtl')
  }
}


