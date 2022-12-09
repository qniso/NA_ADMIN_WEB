import { Injectable } from '@angular/core';
import { URLS } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  share,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userInfo$$ = new BehaviorSubject<User | undefined>(undefined);
  userRoles$$ = new BehaviorSubject<any | undefined>(undefined);

  userInfo$ = this.userInfo$$.asObservable().pipe(share());
  userRoles$ = this.userRoles$$.asObservable().pipe(share());

  userInfoWithRoles$ = forkJoin([this.userInfo$, this.userRoles$]).pipe(
    tap((data) => console.log(data))
  );

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('currentUser_NA');
    if (userData) this.userInfo$$.next(JSON.parse(userData));

    const userRoles = localStorage.getItem('role');
    if (userRoles) this.userRoles$$.next(JSON.parse(userRoles));
  }

  set userInfo(data: any) {
    if (data) this.userInfo$$.next(data);
  }

  set userRoles(data: any) {
    if (data) this.userRoles$$.next(data);
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.GET_EMPLOYEE_LIST
    );
  }

  getRoles(): Observable<UserRole> {
    return this.http.get<UserRole>(
      URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.GET_ALL_ROLES
    );
  }

  saveNewUser(value: Object): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.NEW_USER,
      value
    );
  }

  saveUserProfile(value: Object): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.SAVE_USER_PROFILE,
      value
    );
  }
}
