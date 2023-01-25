import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { URLS } from 'src/app/app.config';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyInfo$$ = new BehaviorSubject<any | undefined>(undefined);
  companyInfo$ = this.companyInfo$$.asObservable().pipe(share());

  constructor(private http: HttpClient) {}

  set companyInfo(data: any) {
    if (data) this.companyInfo$$.next(data);
  }

  getCompanyInfo(): Observable<any> {
    return this.http.get<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.COMPANY + URLS.GET_COMPANY_INFO
    );
  }
}
