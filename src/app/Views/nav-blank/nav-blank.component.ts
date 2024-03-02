import { LowerCasePipe } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartdetails } from 'src/app/Shared/Interfaces/cartdetails';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  numOfCartItems : number = 0;
constructor(private _router: Router , private _cartService:CartService){}
  ngOnInit(): void {
    this._cartService.numOfCartItems.subscribe({
      next: (cartItems: number) =>{

          this.numOfCartItems = cartItems;
      },
      error: (err) => console.log(err)

    })

    this._cartService.getProductFromCart().subscribe({
      next: (response: Cartdetails) =>{
        if (response.status === 'success') {

          this._cartService.numOfCartItems.next(response.numOfCartItems);
        }
      },
      error:(err)=> console.log(err)



    })
  }

  signOUt():void{

    localStorage.removeItem('eToken');
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }

}
