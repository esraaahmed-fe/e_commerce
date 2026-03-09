import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { UserData, UserDataResponse } from '../../models/user/user-data.interface';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEY } from '../../../constants/storedKeys';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient=inject(HttpClient);
  private readonly router=inject(Router);

  userDataDecoded:any=null;
  sendRegisterData(userdata:UserData):Observable<UserDataResponse>{
return this.httpClient.post<UserDataResponse>(environment.base_url+'auth/signup',userdata)
  }
  sendLoginData(userdata:UserData):Observable<UserDataResponse>{
return this.httpClient.post<UserDataResponse>(environment.base_url+'auth/signin',userdata)
  }
  decodeUserToken():void{  //بفك تشفيره الtoken

if(localStorage.getItem(STORED_KEY.userToken )){

  this.userDataDecoded = jwtDecode(localStorage.getItem(STORED_KEY.userToken )!);

console.log(this.userDataDecoded);

  }

}
userLogOut():void{
  localStorage.removeItem(STORED_KEY.userToken);
  this.router.navigate(['/login'])
}
}


