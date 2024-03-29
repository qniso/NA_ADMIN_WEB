import { Component, OnInit } from '@angular/core';
import { CompanyList } from '../../models/company.model';
import { EditCompanyService } from '../../services/edit-company.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = [];

  constructor(
    private company: EditCompanyService
  ) { }

  ngOnInit(): void {
    this.getTableList()
  }

  getTableList(){
    let token = JSON.parse(localStorage.getItem('currentUser_NA')!);
    this.company.getCompanyList(token.accessToken).subscribe(res => {
      this.dataSource = res.companies
      console.log(res.companies);

    })
    console.log(token.accessToken);
    
  }

}
