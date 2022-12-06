import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { 
  catchError, 
  Observable, 
  throwError 
} from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accessToken = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      console.log(this.auth.getToken());
      
        request = request.clone({
          setHeaders: {
            Authorization:`${this.auth.getToken()}`
          }
        });

    return next
    .handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 500){
          console.log('500 Jwt EXPIRED');
          localStorage.removeItem('currentUser_NA');
        }

        return throwError(()=> err);
      })
    );
  }
}
