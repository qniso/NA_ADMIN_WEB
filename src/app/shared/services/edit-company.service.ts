import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLS } from 'src/app/app.config';
import { NewCompany , CompanyList} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class EditCompanyService {

  constructor(
    private http: HttpClient,
  ) { }


  test(data: Object):Observable<NewCompany>{
    return this.http.post<NewCompany>(URLS.BASE_URL + URLS.NA_API + URLS.COMPANY + URLS.NEW_COMPANY , data)
  }
  
  getCompanyList():Observable<any>{
    //
    return this.http.get<any>("http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/na-app-api/company/get_all")
  }
}
