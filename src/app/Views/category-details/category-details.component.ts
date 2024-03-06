import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { Category, Product } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';
import { WishlistService } from 'src/app/Shared/Services/wishlist.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  wishlistDate: string[] = [];
  categories: Category = {} as Category;
  searchKey: string = '';
  productssubscribe: Subscription = new Subscription();
  addCartsubscribe: Subscription = new Subscription();
  addWishliatSubscribe: Subscription = new Subscription();
  removeWishliatSubscribe: Subscription = new Subscription();
  getWishliatSubscribe: Subscription = new Subscription();
  categorySpicifiSubscribe: Subscription = new Subscription();
  getSpecificProductsByCategorySubscribe: Subscription = new Subscription();

  constructor(
    private _ecomdataService: EcomdataService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {

    // ! get spicifi product by category
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        const category_id: any = param.get('id');
        this.getSpecificProductsByCategorySubscribe = this._ecomdataService
          .getSpecificProductsByCategory(category_id)
          .subscribe({
            next: ({ data }) => {
              this.products = data
              // console.log(data);
            },
          });
      },
      error: (err) => console.log(err),
    });
    // !get spicific category
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        const category_id: any = param.get('id');
        this.categorySpicifiSubscribe = this._ecomdataService
          .getSpecificCategory(category_id)
          .subscribe({
            next: ({ data }) => {
              this.categories = data
              // console.log(data);
            },
          });
      },
      error: (err) => console.log(err),
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
            this._wishlistService.wishlistCount.next(this.wishlistDate.length);
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
            this._wishlistService.wishlistCount.next(this.wishlistDate.length);
          }
        },
        error: (err) => {
          this._toastrService.error(err);
        },
      });
  }
  //*=>>>>>>> add  to cart
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
    this.categorySpicifiSubscribe.unsubscribe();
    this.getSpecificProductsByCategorySubscribe.unsubscribe();
    this.addCartsubscribe.unsubscribe();
    this.addWishliatSubscribe.unsubscribe();
    this.removeWishliatSubscribe.unsubscribe();
    this.getWishliatSubscribe.unsubscribe();
  }
}
