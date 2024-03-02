import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { Product } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  searchKey: string = '';
  productssubscribe: Subscription = new Subscription();
  addCartsubscribe: Subscription = new Subscription();
  constructor(
    private _ecomdataService: EcomdataService,
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}
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
    this.productssubscribe.unsubscribe();
    this.addCartsubscribe.unsubscribe();
  }
}
