import { HttpInterceptorFn } from '@angular/common/http';
import { STORED_KEY } from '../../constants/storedKeys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
const plate_id =inject(PLATFORM_ID) //عملت const مش private redonlyعلشات هنا funمشclass
//req
if(isPlatformBrowser(plate_id)){
  const token=localStorage.getItem(STORED_KEY.userToken)
if(token){
if(req.url.includes('cart')||req.url.includes('orders')){ // علشان يتبعت للى محتاج الtokenبس
      req=req.clone({ //cloneنسخه علشان مشتغلش ع الاصلى
    setHeaders:{
      token:token
    }
  })
}
}
}
  return next(req); //resp
};
