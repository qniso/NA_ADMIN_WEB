import { Injectable } from '@angular/core';
import { URLS } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  share,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { User, UserProfile, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userInfo$$ = new BehaviorSubject<User | undefined>(undefined);
  userRoles$$ = new BehaviorSubject<any | undefined>(undefined);
  userProfile$$ = new BehaviorSubject<UserProfile | undefined>(undefined);
  userEducation$$ = new BehaviorSubject<any>(undefined);
  userInternship$$ = new BehaviorSubject<any>(undefined);
  userInternShip$$ = new BehaviorSubject<any>(undefined);
  userInstruction$$ = new BehaviorSubject<any>(undefined);
  // Проставить с моделей сюда типы

  data: any;

  userInfo$ = this.userInfo$$.asObservable().pipe(share());
  userRoles$ = this.userRoles$$.asObservable().pipe(share());
  userProfile$ = this.userProfile$$.asObservable().pipe(share());
  userEducation$ = this.userEducation$$.asObservable().pipe(share());
  userInternship$ = this.userInternship$$.asObservable().pipe(share());
  userInstruction$ = this.userInstruction$$.asObservable().pipe(share());

  userInfoWithRoles$ = forkJoin([this.userInfo$, this.userRoles$]).pipe(
    tap((data) => console.log(data))
  );

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('currentUser_NA');
    if (userData) this.userInfo$$.next(JSON.parse(userData));

    const userRoles = sessionStorage.getItem('role');
    if (userRoles) this.userRoles$$.next(JSON.parse(userRoles));
  }

  set userInfo(data: any) {
    if (data) this.userInfo$$.next(data);
  }

  set userRoles(data: any) {
    if (data) this.userRoles$$.next(data);
  }

  set userProfile(data: any) {
    if (data) this.userProfile$$.next(data);
  }

  set userEducation(data: any) {
    if (data) this.userEducation$$.next(data);
  }

  set userInternship(data: any) {
    if (data) this.userInternship$$.next(data);
  }

  set userInstruction(data: any) {
    if (data) this.userInstruction$$.next(data);
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
      URLS.BASE_URL + URLS.NA_API + URLS.USER_PROFILE + URLS.SAVE_USER_INFO,
      value
    );
  }

  getUserProfile(id: number): Observable<any> {
    return this.http
      .post<any>(
        URLS.BASE_URL + URLS.NA_API + URLS.USER_PROFILE + URLS.GET_USER_PROFILE,
        { userId: id }
      )
      .pipe(map((res) => (this.data = res)));
  }
  saveUserEducation(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.SAVE_INFO_EDUCATION,
      body
    );
  }

  editUserEducation(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.EDIT_INFO_EDUCATION,
      body
    );
  }

  addUserDriverLicense(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.SAVE_INFO_DRIVING_LICENSE,
      body
    );
  }
  editUserDriverLicense(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.EDIT_INFO_DRIVING_LICENSE,
      body
    );
  }
  saveExistDocument(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL + URLS.NA_API + URLS.USER_PROFILE + URLS.EXIST_DOCUMENT,
      body
    );
  }
  editUserInternship(body: {}): Observable<any> {
    return this.http.post(
      URLS.BASE_URL + URLS.NA_API + URLS.USER_PROFILE + URLS.SAVE_INTERSHIP,
      body
    );
  }

  deleteUserEducation(body: {}): Observable<any> {
    return this.http.delete(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.REMOVE_INFO_EDUCATION,
      { body: body }
    );
  }

  deleteUserInternship(body: {}): Observable<any> {
    return this.http.delete(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.REMOVE_INFO_INTERNSHIP,
      { body: body }
    );
  }

  deleteUserDrivingLicense(body: {}): Observable<any> {
    return this.http.delete(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.USER_PROFILE +
        URLS.REMOVE_INFO_DRIVING_LICENSE,
      { body: body }
    );
  }
}
