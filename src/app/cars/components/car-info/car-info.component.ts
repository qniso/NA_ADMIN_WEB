import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CarProfileEditComponent } from 'src/app/shared/components/dialog-components/car-profile-edit/car-profile-edit.component';
import { CurrentCarProfile } from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit {
  carInfo!: CurrentCarProfile;
  carId!: number | null;

  constructor(
    public dialog: MatDialog,
    private transportService: TransportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.carId = id;
    this.getInfo(this.carId);
    this.transportService.currentCarId = this.carId;
  }

  getInfo(id: number | null): void {
    const body = {
      id: id,
    };
    this.transportService
      .getTransportInfo(body)
      .subscribe((res) => (this.carInfo = res));
  }

  openEditDialog(value?: string): void {
    switch (value) {
      case 'usingReasonInfo':
        this.transportService.editKey$$.next(value);
        break;
      case 'generalInfo':
        this.transportService.editKey$$.next(value);
        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(CarProfileEditComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }
}
