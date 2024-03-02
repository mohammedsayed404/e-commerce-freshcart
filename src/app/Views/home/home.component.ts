import { Category } from 'src/app/Shared/Interfaces/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Shared/Interfaces/product';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
  constructor(private _ecomdataService: EcomdataService,private _cartService:CartService ,private _toastrService: ToastrService){}

  products:Product [] = [];
  categories:Category [] = [];
  searchKey:string ='';
  productssubscribe:Subscription = new Subscription();
  categorysubscribe:Subscription = new Subscription();
  addCartsubscribe:Subscription = new Subscription();


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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  addProductToCart(productId:string):void{
  this.addCartsubscribe =  this._cartService.addToCart(productId).subscribe({
      next:(response:Cartdetails)=> {
        // console.log(response);
        if (response.status === 'success') {
          this._cartService.numOfCartItems.next(response.numOfCartItems)
         this._toastrService.success(response.message)
        }else{
          this._toastrService.error(response.message)
        }

      },
      error:(err)=> {
        console.log(err);

      }
    })
  }



ngOnInit(): void {

  this.productssubscribe =   this._ecomdataService.getProducts().subscribe({
      next : ({data})=>{
        this.products = data;
        // console.log(data);

      },
      error : (err)=>{
        console.log(err);

      }
    });
  this.categorysubscribe = this._ecomdataService.getCategories().subscribe({
    next: ({data})=>{
      this.categories = data;
      // console.log(data);

    },
    error : (err)=>{
      console.log(err);

    }
  })





 }
ngOnDestroy(): void {
 this.productssubscribe.unsubscribe();
 this.categorysubscribe.unsubscribe();
 this.addCartsubscribe.unsubscribe();
}

}
