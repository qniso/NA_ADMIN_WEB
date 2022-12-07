import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {



  constructor(
    private transportService: TransportService
  ) { }

  ngOnInit(): void {
  }

}
