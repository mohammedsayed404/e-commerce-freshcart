import { Product } from 'src/app/Shared/Interfaces/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product = {} as Product;
  images: string[] = [];
  productIdsubscribe: Subscription = new Subscription();
  addCartsubscribe: Subscription = new Subscription();
  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ecomdataService: EcomdataService,
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        const product_id: any = param.get('id');

        this.productIdsubscribe = this._ecomdataService
          .getProductsById(product_id)
          .subscribe({
            next: ({ data }) => {
              this.product = data;
              this.images = data.images;
              console.log(data);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductToCart(productId: string): void {
    this.addCartsubscribe = this._cartService.addToCart(productId).subscribe({
      next: (response: Cartdetails) => {
        console.log(response);
        if (response.status === 'success') {
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
    this.productIdsubscribe.unsubscribe();
    this.addCartsubscribe.unsubscribe();
  }
}
