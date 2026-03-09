import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
//req
const toastrService =inject(ToastrService)
  return next(req).pipe(catchError((err:HttpErrorResponse)=>{
   toastrService.error(err.error.message)

return throwError(()=>err)   //لازم يكون اللى راجع بيreturn observable ف عندى methodاسمها throwErrorبترجع observable
  })) //res
  //RXJS operatorsلازم علشان استعملها يكون قبلها بيreturn observable
  //يطبقها جوه pipe()


};
