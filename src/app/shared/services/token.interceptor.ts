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
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accessToken = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    request = request.clone({
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
