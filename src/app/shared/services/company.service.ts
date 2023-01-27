import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share } from 'rxjs';
import { URLS } from 'src/app/app.config';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyInfo$$ = new BehaviorSubject<any | undefined>(undefined);
  editKey$$ = new BehaviorSubject<any>(undefined);

  companyInfo$ = this.companyInfo$$.asObservable().pipe(share());
  editKey$ = this.editKey$$.asObservable().pipe(share());

  data!: Company;

  constructor(private http: HttpClient) {}

  set companyInfo(data: any) {
    if (data) this.companyInfo$$.next(data);
  }
  set editKey(data: any) {
    if (data) this.editKey$$.next(data);
  }

  getCompanyInfo(): Observable<Company> {
    return this.http
      .get<Company>(
        URLS.BASE_URL + URLS.NA_API + URLS.COMPANY + URLS.GET_COMPANY_INFO
      )
      .pipe(map((res) => (this.data = res)));
  }

  editCompanyName(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.COMPANY + URLS.EDIT_COMPANY_NAME,
      body
    );
  }
  editGlobalInfo(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.COMPANY + URLS.EDIT_GLOBAL_INFO,
      body
    );
  }
  editIdentificationDetails(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.COMPANY +
        URLS.EDIT_IDENTIFICATION_DETAILS,
      body
    );
  }
}
