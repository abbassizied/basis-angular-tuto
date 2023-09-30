import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tsService: TokenStorageService,
    private authService: AuthenticationService // private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request', req);
    // Get the access token from the service.
    const accessToken = this.tsService.getAccessToken();
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      map((res) => {
        console.log('Passed through the auth interceptor in response - ', res);
        return res;
      }),
      catchError((error) => {
        console.log('-------------------Begin------------------');
        console.log(error instanceof HttpErrorResponse);
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            console.log('HTTP ERROR 401');
            /* ----------------------------------------------- */
            //const refreshToken = this.tsService.getRefreshToken();
            let res = this.authService.refreshAccessToken();
            console.log('ressssssssssss : ', res);
            fetch('http://localhost:8000/refresh', { method: 'POST' }).then(
              (response) => {
                console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                console.log("response.data.token : ", response?.data.token);
                const newAccessToken = response.data.token;
                console.log("newAccessToken : ", newAccessToken);
                console.log("------ 3");
                localStorage.setItem("token", newAccessToken);
              }
            );

            /* ----------------------------------------------- */
          }
          if (error.status == 403 && req.url.includes('refresh')) {
            console.log('HTTP 403 && refresh token');
            // this failed, so let's redirect to the login page
            this.authService.logout();
          }
        }
        console.log('-------------------End------------------');
        return throwError(() => error);
      }),
      retry(5) // retry 2 times on error
    );
  }
}
