
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CartDetails } from './models/cart-details.interface';
import { CartService } from './services/cart.service';
import { STORED_KEY } from '../../core/constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly plate_id = inject(PLATFORM_ID);
  cartDetailsData: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);

  ngOnInit(): void {
    if (isPlatformBrowser(this.plate_id)) {
      const token = localStorage.getItem(STORED_KEY.userToken);
      if (token) {
        this.getUserCartData();
      }
    }
  }

  getUserCartData(): void {
    this.cartService.getLogeedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
          this.cartService.updateCartCount(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeProductItemFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
          this.cartService.updateCartCount(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateProductCount(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
          this.cartService.updateCartCount(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToCheckOut(): void {
    if (this.cartDetailsData()?.products.length > 0) {
      this.router.navigate(['/checkout',this.cartDetailsData()._id]);
    }
  }
}
