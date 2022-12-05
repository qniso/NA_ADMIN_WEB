import { Component, OnInit } from '@angular/core';
import { EditCompanyService } from '../../services/edit-company.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = [];

  constructor(
    private company: EditCompanyService
  ) { }

  ngOnInit(): void {
    this.getTableList()
  }

  getTableList(){
    this.company.getCompanyList().subscribe(res => {
      this.dataSource = res.companies;
    })
  }
}
