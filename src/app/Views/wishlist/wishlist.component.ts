import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { Product } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';
import { WishlistService } from 'src/app/Shared/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  addCartsubscribe: Subscription = new Subscription();
  wishliatSubscribe: Subscription = new Subscription();
  constructor(
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.wishliatSubscribe = this._wishlistService.getUserWishlist().subscribe({
      next: ({ data }) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(productId: string): void {
    this.addCartsubscribe = this._cartService.addToCart(productId).subscribe({
      next: (response: Cartdetails) => {
        // console.log(response);
        if (response.status === 'success') {
          this._cartService.numOfCartItems.next(response.numOfCartItems);
          this._toastrService.success(response.message);
        } else {
          this._toastrService.error(response.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  ngOnDestroy(): void {
    this.addCartsubscribe.unsubscribe();
    this.wishliatSubscribe.unsubscribe();
  }
}
