import { HttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _httpClient:HttpClient) {}
  saveUserData():void{
    if(localStorage.getItem('eToken')){
      const token:any = localStorage.getItem('eToken');
      const userData:any = jwtDecode(token);
      localStorage.setItem('userData',JSON.stringify(userData));
    }
  }

// i need here to the link of api to post the data to db from the form
  setSignUp(formData:FormGroup):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData)
  }
  setSignIn(formData:FormGroup):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData)
  }
}
