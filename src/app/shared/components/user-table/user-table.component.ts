import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = [];

  constructor(
    private users: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList(){
    this.users.getUserList().subscribe(res=> {
      this.dataSource = res.employeeInfo;
    });
    // this.company.getCompanyList().subscribe(res => {
    //   this.dataSource = res.companies;
    // })
  }
}
