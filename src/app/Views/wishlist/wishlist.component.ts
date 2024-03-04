import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { Product } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { WishlistService } from 'src/app/Shared/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  wishlistDate: string[] = [];
  allWishlist: Product[] = [];
  addCartsubscribe: Subscription = new Subscription();
  getWishliatSubscribe: Subscription = new Subscription();
  addWishliatSubscribe: Subscription = new Subscription();
  removeWishliatSubscribe: Subscription = new Subscription();
  constructor(
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
   this.getWishlist();
  }
  getWishlist():void{
    this._wishlistService.getUserWishlist().subscribe({
      next: (response ) => {
          if (response.status === "success") {
            // console.log(response.data);
          this.products = response.data
          this._wishlistService.wishlistCount.next(response.count)
        const newWishlistData = response.data.map((item: any) => item._id);

        this.wishlistDate = newWishlistData;
          }
      },
    });
  }


  //*=>>>>>>> add to cart
  addProductToCart(productId: string): void {
    this.addCartsubscribe = this._cartService.addToCart(productId).subscribe({
      next: (response: Cartdetails) => {
        // console.log(response);
        if (response.status === 'success') {
          this._cartService.numOfCartItems.next(response.numOfCartItems);
          this.removeFormWishlist(productId);
          this._toastrService.success(response.message);
        } else {
          this._toastrService.error(response.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    // this.removeFormWishlist(productId)
  }

//*=>>>>>>> remove to wishlist
  removeFormWishlist(productId: string): void {
    this.removeWishliatSubscribe = this._wishlistService
      .removeProductFromWishlist(productId)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // console.log(response);
            this.wishlistDate = response.data;
            this._toastrService.success(response.message);
            const newProductsList = this.products.filter((product:any)=>this.wishlistDate.includes(product._id))
            this.products = newProductsList;
            //TODO USING LENGHT TO MAKE IT FASTER FROM REQUEST
            this._wishlistService.wishlistCount.next(this.products.length)
          }
        },
        error: (err) => {
          this._toastrService.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.addCartsubscribe.unsubscribe();
    this.getWishliatSubscribe.unsubscribe();
    this.addWishliatSubscribe.unsubscribe();
    this.removeWishliatSubscribe.unsubscribe();
  }
}
