import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentCarProfile } from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-edit-general-info',
  templateUrl: './edit-general-info.component.html',
  styleUrls: ['./edit-general-info.component.scss'],
})
export class EditGeneralInfoComponent implements OnInit {
  data: CurrentCarProfile = this.transportService.data;

  generalInfo!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.generalInfo = this.fb.group({
      fuelTankVolume: [
        this.data.general_info.fuel_tank_volume,
        [Validators.required],
      ],
      height: [this.data.general_info.height, [Validators.required]],
      mileage: [this.data.general_info.mileage, [Validators.required]],
      length: [this.data.general_info.length, [Validators.required]],
      width: [this.data.general_info.width, [Validators.required]],
    });
  }

  submit(): void {
    const body = {
      id: this.transportService.currentCarId,
      general_info: {
        fuel_tank_volume: Number(
          this.generalInfo.controls['fuelTankVolume'].value
        ),
        height: Number(this.generalInfo.controls['height'].value),
        length: Number(this.generalInfo.controls['length'].value),
        mileage: Number(this.generalInfo.controls['mileage'].value),
        width: Number(this.generalInfo.controls['width'].value),
      },
    };
    console.log(body);
    this.transportService.editGeneralInfo(body).subscribe();
  }
}
