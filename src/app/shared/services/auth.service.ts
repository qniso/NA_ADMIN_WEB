import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';
import { Router } from '@angular/router';

const ONE_HOUR = 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private token: string | null  = null ;
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
            "refresh": "${token.refreshToken}",
            "expDate": "${token.expDate}"
          }`
          );
        this.setToken(token.accessToken);
      }),
    )
  }

  setToken(token: string){
    this.token = token;
  }

  refreshToken(): Observable<any>{
    let data = JSON.parse( localStorage.getItem('currentUser_NA')!);
    return this.http.post<any>('http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/na-app-api/refreshToken', {refreshToken: data.refresh}).pipe(
      tap((refreshToken) => {
        localStorage.setItem(
          'currentUser_NA', 
          `{
            "accessToken":"${refreshToken.accessToken}",
            "refresh": "${refreshToken.refreshToken}",
            "expDate": "${refreshToken.expDate}"
          }`
          );
          this.setToken(refreshToken.accessToken);
      })
    )
  }

  getRefreshToken(): Observable<any>{
    let expDate = JSON.parse( localStorage.getItem('currentUser_NA')!)

    let time = `${expDate.expDate.split('T')[1]}:00`.split(':');
    let expTime = new Date();
    let dateNow = Date.now();

    expTime.setHours(Number(time[0]));
    expTime.setMinutes(Number(time[1]));
    expTime.setMilliseconds(Number(time[2]));

    if(expTime.getTime() <= dateNow){
      //Зaпуск таймера
      this.startRefreshTokenTimer();
      return EMPTY;
    }else{
      //Токен просрочен идёт запрос на обновление токена
      console.log('Просрочен токен');

       this.router.navigate(['/login']);
       return EMPTY;
    }
    
  }



  getToken(){
    return this.token;
  }

  checkAuth(){
    const token = JSON.parse(localStorage.getItem("currentUser_NA")!).accessToken;

    if(token || token !== null || token !== this.getToken()){
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
      // Запрос на обновление токена пошёл 
      this.refreshToken().subscribe();
      this.getRefreshToken();
    }, ONE_HOUR)
  }
}
