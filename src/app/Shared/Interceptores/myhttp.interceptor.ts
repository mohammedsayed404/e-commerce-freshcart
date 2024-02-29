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


    return next.handle(request);
  }
}
