import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url:string = `https://ecommerce.routemisr.com/api/v1/cart`;

  numOfCartItems:BehaviorSubject<number>= new BehaviorSubject(0);

  constructor(private _httpClient:HttpClient) { }

  addToCart(productId:string):Observable<any>{
    const body:object ={productId:productId};
    return this._httpClient.post(this.url,body);
  }
  getProductFromCart():Observable<any>{
    return this._httpClient.get(this.url);
  }
  removeSpecificProduct(productId:string):Observable<any>{
    return this._httpClient.delete(`${this.url}/${productId}`)
  }
  updateProductQuantity(productId:string,newCount:number):Observable<any>{
    const body:object ={count:newCount};
    return this._httpClient.put(`${this.url}/${productId}`,body);
  }
  createCashOrder(cartId:string ,cartFormData:object):Observable<any>{
    const body:object ={
      shippingAddress:cartFormData
  }
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,body)
  }
  getUserOrders(userId:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
  clearCart():Observable<any>{
    return this._httpClient.delete(`${this.url}`)
  }
}
