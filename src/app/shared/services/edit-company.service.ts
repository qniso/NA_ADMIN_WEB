import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewCompany ,UserId, CompanyList} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class EditCompanyService {

  constructor(
    private http: HttpClient,
  ) { }


  test(data: Object):Observable<NewCompany>{
    return this.http.post<NewCompany>("http://na-app-backend.herokuapp.com/company/save_new" ,data)
  }
  
  getCompanyList(Id: number):Observable<CompanyList>{
    return this.http.get<CompanyList>('http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/company/get_all', {headers:{userId: `${Id}`}})
  }
}
