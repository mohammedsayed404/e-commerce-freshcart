import { Product } from 'src/app/Shared/Interfaces/product';
import { Category } from 'src/app/Shared/Interfaces/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/Shared/Services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _ecomdataService: EcomdataService,
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _wishlistService: WishlistService
  ) {}

  products: Product[] = [];
  categories: Category[] = [];
  searchKey: string = '';
  wishlistDate: string[] = [];
  productssubscribe: Subscription = new Subscription();
  categorysubscribe: Subscription = new Subscription();
  addCartsubscribe: Subscription = new Subscription();
  addWishliatSubscribe: Subscription = new Subscription();
  removeWishliatSubscribe: Subscription = new Subscription();
  getWishliatSubscribe: Subscription = new Subscription();

  categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  //*=>>>>>>> add to cart
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

  //*=>>>>>>> add to wishlist
  addProductToWishlist(productId: string): void {
    this.addWishliatSubscribe = this._wishlistService
      .addProductToWishlist(productId)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            // console.log(response);
            this.wishlistDate = response.data;
            this._toastrService.success(response.message);
             // this.getWishlist(); //! using length to make it faster from request
            this._wishlistService.wishlistCount.next(this.wishlistDate.length)
          }
        },
        error: (err) => console.log(err),
      });
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
            // this.getWishlist(); //! using length to make it faster from request
            this._wishlistService.wishlistCount.next(this.wishlistDate.length)
          }
        },
        error: (err) => {
          this._toastrService.error(err);
        },
      });
  }

  ngOnInit(): void {
    this.productssubscribe = this._ecomdataService.getProducts().subscribe({
      next: ({ data }) => {
        this.products = data;
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.categorysubscribe = this._ecomdataService.getCategories().subscribe({
      next: ({ data }) => {
        this.categories = data;
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
   this.getWishliatSubscribe = this._wishlistService.getUserWishlist().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          // console.log(response.data);
          this._wishlistService.wishlistCount.next(response.count);
          const newWishlistData = response.data.map((item: any) => item._id);

          this.wishlistDate = newWishlistData;
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.productssubscribe.unsubscribe();
    this.categorysubscribe.unsubscribe();
    this.addCartsubscribe.unsubscribe();
    this.addWishliatSubscribe.unsubscribe();
    this.removeWishliatSubscribe.unsubscribe();
    this.getWishliatSubscribe.unsubscribe();
  }
}
