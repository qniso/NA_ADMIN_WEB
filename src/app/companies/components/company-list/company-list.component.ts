import { Component, OnInit } from '@angular/core';
import { EditCompanyService } from 'src/app/shared/services/edit-company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  dataSource:[] = [];
  displayedColumns: string[] = ['position', 'name', 'symbol'];


  constructor(
    private company: EditCompanyService
  ) { }

  ngOnInit(): void {
    this.getTableList();
  }


  getTableList(){
    this.company.getCompanyList().subscribe(res => {
      this.dataSource = res.companies;
      console.log(this.dataSource);
      
    })
  }
}
