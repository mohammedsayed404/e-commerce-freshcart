import { LowerCasePipe } from '@angular/common';
import { Component , HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { WishlistService } from 'src/app/Shared/Services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  numOfCartItems : number = 0;
  wishlistCount : number = 0;
constructor(private _router: Router , private _cartService:CartService , private _wishlistService:WishlistService){}
@HostListener('window:scroll', ['$event'])
onWindowScroll():void {
  let element = document.querySelector('.navbar') as HTMLElement;
  // console.log(window.scrollY);
// using scrollY because pageYOffset is deprecated
  if (window.scrollY  > element.clientHeight) {
    // element.classList.add('bg-info');
    element.classList.remove('py-4');
    element.classList.add('fixed-top');
  } else {
    // element.classList.remove('bg-info');
    element.classList.add('py-4');
    element.classList.remove('fixed-top');
  }
}
  ngOnInit(): void {

    //? cart icon
    this._cartService.numOfCartItems.subscribe({
      next: (cartItems: number) =>{

          this.numOfCartItems = cartItems;
      },
      error: (err) => console.log(err)

    });
    this._cartService.getProductFromCart().subscribe({
      next: (response: Cartdetails) =>{
        if (response.status === 'success') {

          this._cartService.numOfCartItems.next(response.numOfCartItems);
        }
      },
      error:(err)=> console.log(err)



    });
  // ! wishlist icon
    this._wishlistService.wishlistCount.subscribe({
      next: (wishlistCount: number) =>{
          this.wishlistCount = wishlistCount;
      },
      error: (err) => console.log(err)
    });
    this._wishlistService.getUserWishlist().subscribe({
      next: (response)=>{
        if(response.status === 'success'){
          this._wishlistService.wishlistCount.next(response.count)
        }
      }
    })




  }

  signOUt():void{

    // localStorage.removeItem('eToken');
    // localStorage.removeItem('userData');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
