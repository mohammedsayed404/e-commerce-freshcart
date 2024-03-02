import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cartproductdetails } from 'src/app/Shared/Interfaces/cartproductdetails';
import { CartService } from 'src/app/Shared/Services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartproductdetails: Cartproductdetails = {} as Cartproductdetails;
  getCartsubscribe: Subscription = new Subscription();
  removeCartsubscribe: Subscription = new Subscription();
  updateCartsubscribe: Subscription = new Subscription();
  constructor(private _cartService: CartService ) {}
  ngOnInit(): void {


    this.getCartsubscribe = this._cartService.getProductFromCart().subscribe({
      next: (data) => {
        this.cartproductdetails = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProductFromCart(productId: string): void {
    this.removeCartsubscribe = this._cartService
      .removeSpecificProduct(productId)
      .subscribe({
        next: (data) => {
          this.cartproductdetails = data;
          this._cartService.numOfCartItems.next(data.numOfCartItems)
          // console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  changeProductQuantity(productId: string, newCount: number): void {
    if (newCount) {
      this.updateCartsubscribe = this._cartService
        .updateProductQuantity(productId, newCount)
        .subscribe({
          next: (data) => {
            this.cartproductdetails = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.getCartsubscribe.unsubscribe();
    this.removeCartsubscribe.unsubscribe();
    this.updateCartsubscribe.unsubscribe();
  }
}
