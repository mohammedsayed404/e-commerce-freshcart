import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _httpClient:HttpClient) { }


  getProducts():Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  getProductsById(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories():Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  getSpecificProductsByCategory(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
  }
  getSpecificCategory(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }

  getBrands():Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  getSpecificBrand(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
  getSpecificProductsByBrand(id:string):Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  }
}
