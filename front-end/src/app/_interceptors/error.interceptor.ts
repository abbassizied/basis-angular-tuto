import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    newRequest: HttpHandler
  ): Observable<HttpEvent<any>> {
    return newRequest.handle(request).pipe(
      map((res) => {
        console.log('Passed through the error interceptor in response');
        return res;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          // check for internet connection
          if (!navigator.onLine) {
            console.log('No internet connection');
          }
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
          } else {
            console.log('This is server side error');
          }
        }
        console.log('Error : ', error);
        // need to rethrow so angular can catch the error
        return throwError(() => error); //Rethrow it back to component
      })
    );
  }
}
