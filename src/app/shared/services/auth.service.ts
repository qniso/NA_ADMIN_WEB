import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { UsersService } from './users.service';

const ONE_HOUR = 50 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private refreshTokenTimer: any;

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private router: Router
  ) {}

  getAuth(userLogin: string, userPassword: string): Observable<User> {
    return this.http
      .post<User>(URLS.BASE_URL + URLS.NA_API + URLS.LOGIN, {
        login: userLogin,
        password: userPassword,
      })
      .pipe(
        tap((userInfo) => {
          localStorage.setItem('currentUser_NA', JSON.stringify(userInfo));

          this.setToken(userInfo.accessToken);
        })
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  refreshToken(): Observable<any> {
    return this.userService.userInfo$.pipe(
      switchMap((userInfo) => {
        return this.http
          .post<any>(URLS.BASE_URL + URLS.NA_API + URLS.REFRESH_TOKEN, {
            refreshToken: userInfo,
          })
          .pipe(
            tap((updatedUserInfo) => {
              localStorage.setItem(
                'currentUser_NA',
                `{
                "accessToken":"${updatedUserInfo.accessToken || ''}",
                "refresh": "${updatedUserInfo.refreshToken || ''}",
                "expDate": "${updatedUserInfo.expDate || ''}"
              }`
              );
              if (!updatedUserInfo) return;

              this.setToken(updatedUserInfo.accessToken);
            })
          );
      })
    );
  }

  getRefreshToken(): Observable<any> {
    return this.userService.userInfo$.pipe(
      tap((userInfo) => {
        if (!userInfo) return;
        let expDate = userInfo.expDate;

        let time = `${expDate.split('T')[1]}:00`.split(':');
        let expTime = new Date();
        let dateNow = Date.now();

        expTime.setHours(Number(time[0]));
        expTime.setMinutes(Number(time[1]));
        expTime.setMilliseconds(Number(time[2]));

        if (expTime.getTime() > new Date(dateNow).getTime()) {
          //Зaпуск таймера
          this.startRefreshTokenTimer();
          return EMPTY;
        } else {
          //Токен просрочен идёт запрос на обновление токена
          console.log('Просрочен токен');

          this.router.navigate(['/login']);
          return EMPTY;
        }
      })
    );
  }

  getToken() {
    return this.token;
  }

  checkAuth() {
    this.userService.userInfo$.subscribe((userInfo) => {
      // console.log(userInfo);
      if (userInfo?.accessToken) {
        this.setToken(userInfo.accessToken);
        return;
      }
      this.router.navigate(['/login']);
    });
  }

  isLogined(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken('null');
    localStorage.removeItem('currentUser_NA');
    sessionStorage.removeItem('role');
  }

  private startRefreshTokenTimer(): void {
    console.log('start timer', true);

    setTimeout(() => {
      // Запрос на обновление токена пошёл
      this.refreshToken().subscribe();
      this.getRefreshToken();
    }, ONE_HOUR);
  }
}
