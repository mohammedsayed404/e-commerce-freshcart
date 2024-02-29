import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent implements OnDestroy ,OnInit {
  ordersubscribe:Subscription = new Subscription();
  isLoading:boolean = false;
  cartId:any= '';
  orderForm:FormGroup = this._formBuilder.group({
    details:[''],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',Validators.required],
  })

  constructor(private _toastrService:ToastrService,private _activatedRoute:ActivatedRoute,private _cartService:CartService ,private _formBuilder:FormBuilder){}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params)=>{
        this.cartId = params.get('id');
     },
     error: (err)=>console.log(err)

  })
}



  checkOut(orderForm:FormGroup):void{

      if (orderForm.valid) {
        this.isLoading = true;
        this.ordersubscribe = this._cartService.createCashOrder(this.cartId,orderForm.value).subscribe({
          next:(response) =>{
              if (response.status === 'success') {
                window.open(response.session.url,'_self');
              }

          }
          ,
          error:(err : HttpErrorResponse) => {
            this._toastrService.error(err.error.message);
          }

        })

      }else{
        this.isLoading = false;
        this.orderForm.markAllAsTouched();
      }


  }


  ngOnDestroy(): void {
    this.ordersubscribe.unsubscribe();
  }
}
