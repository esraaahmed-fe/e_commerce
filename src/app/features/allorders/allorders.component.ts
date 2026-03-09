import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../cart/services/cart.service';
import {  Allorders } from './models/allorders.interface';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-allorders',
  imports: [DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
private readonly cartService =inject(CartService);
    allOrdersData:WritableSignal<Allorders>=signal<Allorders>([])



ngOnInit(): void {
  const token = localStorage.getItem('userToken');

    if (token) {
      const decoded: any = jwtDecode(token);
      this.getAllOrders(decoded.id);


    }


}
getAllOrders(userID:string):void{
  this.cartService.showAllOrders(userID).subscribe({
next:(res)=>{
this.allOrdersData.set(res)


},
error:(err)=>{
  console.log(err);

},
  })
}
}
