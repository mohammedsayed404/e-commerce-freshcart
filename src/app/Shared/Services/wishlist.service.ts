import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  URL:string = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  wishlistCount:BehaviorSubject<number>=new BehaviorSubject(0);

  constructor(private _httpClient:HttpClient) { }


  getUserWishlist():Observable<any>{
    return this._httpClient.get(this.URL);
  }

  addProductToWishlist(productId:string):Observable<any>{
    const body:object = {
      productId: productId
    }
    return this._httpClient.post(this.URL,body)
  }
  removeProductFromWishlist(productId:string):Observable<any>{
    return this._httpClient.delete(`${this.URL}/${productId}`)
  }
}
