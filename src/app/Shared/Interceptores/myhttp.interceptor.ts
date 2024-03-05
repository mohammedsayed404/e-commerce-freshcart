import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor(private _ngxSpinnerService:NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    this._ngxSpinnerService.show();
    if(localStorage.getItem('eToken')){
      const header:any  =  {
        token:localStorage.getItem('eToken')
      }
      request = request.clone({
        setHeaders:header
      })
    }

    // TODO another way to use it here



    // if(localStorage.getItem('eToken')){
    //   request = request.clone({
    //     headers:request.headers.set('token',`${localStorage.getItem('eToken')}`)
    //   })
    // }









    return next.handle(request).pipe(finalize(()=>this._ngxSpinnerService.hide()));
  }
}
