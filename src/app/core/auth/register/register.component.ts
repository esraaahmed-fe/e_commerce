import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/authentication/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
 errorMessage:WritableSignal<string>=signal<string>('');
 isLoading:WritableSignal<boolean>=signal<boolean>(false);
 flag:boolean=true;
refSubscription=new Subscription();

registerForm!:FormGroup
ngOnInit(): void {
  this.registerFormInit();
}
registerFormInit():void{
  this.registerForm=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
  rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),

  phone:new FormControl(null,[Validators.required,Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]),
},{validators:this.handleConfirmPassword});


}
handleConfirmPassword(group:AbstractControl){//AbstractControlده الclass الاساسى اللى خارج منه الformcontrol,formGroup,formArray
  return group.get('password')?.value=== group.get('rePassword')?.value ?null :{missMatch:true};
}
submitRegisterForm():void{

if(this.registerForm.valid){
  this.isLoading.set(true);
this.refSubscription.unsubscribe()
this.refSubscription= this.authService.sendRegisterData(this.registerForm.value).subscribe({
  next:(res)=>{
      console.log(res);
    if(res.message==='success'){
  this.isLoading.set(false);
  this.registerForm.reset();
  this.errorMessage.set('');
setTimeout(() => {
   this.router.navigate(['/login'])
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
else{
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",

});
this.showFirstError();
}

}

showFirstError():void{
 const controls =this.registerForm.controls;




 for (const controlName in controls) {
  const control =controls[controlName];
  if(control.invalid){
    control.markAsTouched();
    break;


  }

 }
}
togglePasswordType():void{
  this.flag=!this.flag
}
}
