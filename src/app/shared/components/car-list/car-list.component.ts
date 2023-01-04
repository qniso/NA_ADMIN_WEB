import { Component, OnInit } from '@angular/core';
import { EditCompanyService } from '../../services/edit-company.service';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'brand',
    'stateNumber',
    'nomenclatureName',
    'transportStatus',
    'edit',
  ];
  dataSource = [];

  constructor(private transportService: TransportService) {}

  ngOnInit(): void {
    this.getTransportList();
  }

  getTransportList(): void {
    this.transportService.getAllTransport().subscribe((res) => {
      this.dataSource = res.transports;
    });
  }
}
