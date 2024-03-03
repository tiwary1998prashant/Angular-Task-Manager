import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
   // console.log('before Interceptor request', request);
    var currentUser = { token: '' };
    if (sessionStorage['currentUser'] != null) {
      currentUser = JSON.parse(sessionStorage['currentUser']);
    }

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + currentUser.token,
      },
    });
   // console.log('after Interceptor request', request);
    return next.handle(request);
  }
}
