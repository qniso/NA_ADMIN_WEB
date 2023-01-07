import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit {
  userId!: number | null;

  constructor(
    private transportService: TransportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userId = id;
    this.getInfo(this.userId);
  }

  getInfo(id: number | null): void {
    const body = {
      id: id,
    };
    this.transportService.getTransportInfo(body).subscribe();
  }
}
