import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  isLoading:boolean = false;
  noCart:string ='';
  getCartsubscribe: Subscription = new Subscription();
  removeCartsubscribe: Subscription = new Subscription();
  updateCartsubscribe: Subscription = new Subscription();
  clearCartSubscription: Subscription = new Subscription();
  constructor(private _cartService: CartService,private _toastrService:ToastrService) {}
  ngOnInit(): void {


    this.getCartsubscribe = this._cartService.getProductFromCart().subscribe({
      next: (data) => {
        this.isLoading= true;
        this.cartproductdetails = data;
      },
      error: (err:HttpErrorResponse) => {
        // console.log(err.error.message);
        this.noCart= err.error.message;
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

  clear():void{
   this.clearCartSubscription =  this._cartService.clearCart().subscribe({
      next: (response) => {
        if(response.message === "success"){
          this.isLoading = false;
          this._cartService.numOfCartItems.next(0)
          this.cartproductdetails.data.products = [];
          this._toastrService.success('Your cart is empty now')
        }
      },
      error: (err) => console.log(err)

    })
  }

  ngOnDestroy(): void {
    this.getCartsubscribe.unsubscribe();
    this.removeCartsubscribe.unsubscribe();
    this.updateCartsubscribe.unsubscribe();
    this.clearCartSubscription.unsubscribe();

  }
}
