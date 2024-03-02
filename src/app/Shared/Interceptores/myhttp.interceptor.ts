import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

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









    return next.handle(request);
  }
}
