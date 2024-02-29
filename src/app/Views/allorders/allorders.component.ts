import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/Shared/Interfaces/order';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { RegisterService } from 'src/app/Shared/Services/register.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit,OnDestroy {
  allorderssubscription: Subscription = new Subscription();
  userData:any;
  Orders:Order [] = [];
constructor(private _cartService:CartService) {}
  ngOnInit(): void {
    // TODO why using pare make error with localstorage
    this.userData = localStorage.getItem('userData');
    const userData  = JSON.parse(this.userData);
    const userId = userData.id;
    this.allorderssubscription = this._cartService.getUserOrders(userId).subscribe({
      next: (response)=>{
        this.Orders = response;
        // console.log(this.Orders);


      },
      error: (err) => console.log(err)

    })
  }
  ngOnDestroy(): void {
    this.allorderssubscription.unsubscribe();

  }

}
