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
  finalize, 
  Observable, 
  throwError 
} from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { URLS } from 'src/app/app.config';
import { LoadingService } from './loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accessToken = '';

  constructor(
    private loader: LoadingService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // console.log(this.auth.getToken());
      this.loader.show();
      if(request.url == URLS.BASE_URL + URLS.NA_API + URLS.LOGIN || request.url == URLS.BASE_URL + URLS.NA_API + URLS.REFRESH_TOKEN){
        request = request.clone({
          setHeaders: {
            Authorization: ''
          }
        });
      }else{
        request = request.clone({
          setHeaders: {
            Authorization:`${this.auth.getToken()}`
          }
        });
      }
      
    return next
    .handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 500){
          localStorage.removeItem('currentUser_NA')
          this.router.navigate([''])
          console.log('500 Jwt EXPIRED');
        }
        return throwError(()=> err);
      }),
      finalize(()=> {
        this.loader.hide();
      })
    );
  }
}
