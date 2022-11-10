import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  setting: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'NOVOOLEKSANDRIVSKA', weight: 60, symbol: '12.12.2022',setting: 'settings'},
  {position: 2, name: 'NOVOOLEKSANDRIVSKA', weight: 60, symbol: '12.12.2022',setting: 'settings'},
  {position: 3, name: 'NOVOOLEKSANDRIVSKA', weight: 60, symbol: '12.12.2022',setting: 'settings'},
  {position: 4, name: 'NOVOOLEKSANDRIVSKA', weight: 60, symbol: '12.12.2022',setting: 'settings'},
 
];



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','setting'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
