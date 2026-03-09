
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { STORED_KEY } from '../../constants/storedKeys';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

 private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
 errorMessage:WritableSignal<string>=signal<string>('');
 flag:boolean=true;
 isLoading:WritableSignal<boolean>=signal<boolean>(false);
refSubscription=new Subscription();
LoginForm!:FormGroup
ngOnInit(): void {
  this.loginFormInit();
}
loginFormInit():void{
this.LoginForm=new FormGroup({

  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),



});
}

submitLoginForm():void{
if(this.LoginForm.valid){
  this.isLoading.set(true);
this.refSubscription.unsubscribe();
 this.refSubscription=this.authService.sendLoginData(this.LoginForm.value).subscribe({
  next:(res)=>{
      console.log(res);
    if(res.message==='success'){
  this.isLoading.set(false);
  this.LoginForm.reset();
  localStorage.setItem(STORED_KEY.userToken,res.token);
  this.authService.decodeUserToken();
  this.errorMessage.set('');
setTimeout(() => {
   this.router.navigate(['/home'])
}, 1000);
    }


  },
    error:(err:HttpErrorResponse)=>{
    console.log(err);
     this.isLoading.set(false);
    this.errorMessage.set(err.error.message)

  },
 })
}

}
togglePasswordType():void{
  this.flag=!this.flag
}
}

