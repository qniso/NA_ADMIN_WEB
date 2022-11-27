import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accessToken = '';

  constructor(
    private http: HttpClient
  ) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    request  = request.clone({
      setHeaders: {
        Authorization: `${TokenInterceptor.accessToken}`
      }
    });

    return next
    .handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          console.log(true);
          
        }

        return throwError(()=> err);
      })
    );
  }
}
