import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';
import { TokenInterceptor } from './token.interceptor';
import { Router } from '@angular/router';

const ONE_HOUR = 5 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private token: string | null  = null ;
  private refreshTokenStr: string | null = null;
  private exp: any = null;
  private refreshTokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.post<User>(URLS.BASE_URL + URLS.NA_API + URLS.LOGIN, {login: userLogin, password: userPassword})
    .pipe(
      tap((token)=> {
        
        localStorage.setItem(
          'currentUser_NA', 
          `{
            "accessToken":"${token.accessToken}",
            "expDate": "${token.expDate}"
          }`
          );
        this.setToken(token.accessToken);
      }),
      tap((refreshToken)=> {
        this.setRefreshToken(refreshToken.refreshToken, refreshToken.expDate);
      })
    )
  }

  setToken(token: string){
    this.token = token;
  }

  setRefreshToken(refreshToken: string, exp:any){
    this.refreshTokenStr = refreshToken;
    this.exp = exp;
  }

  refreshToken(): Observable<any>{
    return this.http.get<any>('')
  }

  getRefreshToken(): Observable<any>{
    let expDate = JSON.parse( localStorage.getItem('currentUser_NA')!)
    console.log(expDate.expDate);
    
    let time = `${expDate.expDate.split('T')[1]}:00`.split(':');
    let expTime = new Date();
    let dateNow = Date.now();
    expTime.setHours(Number(time[0]));
    expTime.setMinutes(Number(time[1]));
    expTime.setMilliseconds(Number(time[2]));

    console.log(expTime.getTime() - dateNow);
    

    if(expTime.getTime() - dateNow){
      this.startRefreshTokenTimer();
      return EMPTY;
    }else{
      console.log("RefreshToken");
      return this.refreshToken();
    }
    
  }



  getToken(){
    return this.token;
  }

  checkAuth(){
    const token = JSON.parse(localStorage.getItem("currentUser_NA")!).accessToken;

    if(token || token !== null){
      this.setToken(token);
    }else{
      this.router.navigate(['/login']);
    }
  }
  
  isLogined(): boolean{
   return !!this.token; 
  }

  logout(){
    this.setToken('null');
    localStorage.removeItem('currentUser_NA');
  }

  private startRefreshTokenTimer(): void{
    this.refreshTokenTimer = setTimeout(() => {
      console.log('Запрос на обновление токена пошёл ');
      
    }, 5000)
  }
}
