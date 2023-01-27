import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  EnvironmentStandart,
  Fuels,
  Transport,
} from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.scss'],
})
export class CarRegistrationComponent implements OnInit {
  carRegistration!: FormGroup;
  fuels!: Fuels[];
  envStandarts!: EnvironmentStandart[];

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCarSettingsData();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.carRegistration = this.fb.group({
      nomenclatureName: ['', [Validators.required]],
      technicalPassportSeries: ['', [Validators.required]],
      technicalPassportIssuedBy: ['', [Validators.required]],
      validUntil: ['', [Validators.required]],
      dateOfIssuance: ['', [Validators.required]], //datepicker
      brand: ['', [Validators.required]],
      governmentNumber: ['', [Validators.required]],
      VINCode: ['', [Validators.required]],
      color: ['', [Validators.required]],
      numberOfSeats: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      fullWeight: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      massWithoutLoad: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]/)],
      ],
      category: ['', [Validators.required]],
      typeOfFuel: ['', [Validators.required]], //select
      bodyType: ['', [Validators.required]],
      engineCapacity: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      power: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      ecologicalStandard: ['', [Validators.required]], //select
      contractNameAndNumber: ['', [Validators.required]],
      dateOfTheContract: ['', [Validators.required]], //datepicker
      contractIsFixedterm: [true, [Validators.required]],
      expiryDate: ['', [Validators.required]], //datepicker
      futureUsagePlans: ['', [Validators.required]], //datepicker
      odonometerIndicator: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]/)],
      ],
      fuelTankValue: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      height: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      width: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      length: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
    });
  }

  convertToDate(value: any) {
    const date = value;
    let dd: any = date.split('.')[0];
    let mm: any = date.split('.')[1];
    let yy: any = date.split('.')[2];
    return new Date(yy, mm - 1, dd);
  }

  formatDate(value: any) {
    const date = new Date(value);

    let dd: any = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: any = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: any = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
  }

  getCarSettingsData(): void {
    this.transportService
      .getFuel()
      .subscribe((res) => (this.fuels = res.fuels));
    this.transportService
      .getEnvironmentStandart()
      .subscribe((res) => (this.envStandarts = res.standards));
  }

  submit(): void {
    const transport: Transport = {
      transport_card: {
        nomenclature_name:
          this.carRegistration.controls['nomenclatureName'].value,
        technical_certificate: {
          num_and_series:
            this.carRegistration.controls['technicalPassportSeries'].value,
          issued_by:
            this.carRegistration.controls['technicalPassportIssuedBy'].value,
          date_end: this.formatDate(
            this.carRegistration.controls['validUntil'].value
          ),
          date_issue: this.formatDate(
            this.carRegistration.controls['dateOfIssuance'].value
          ),
          technical_certificate_dop_info: {
            brand: this.carRegistration.controls['brand'].value,
            state_number:
              this.carRegistration.controls['governmentNumber'].value,
            VIN_code: this.carRegistration.controls['VINCode'].value,
            colour: this.carRegistration.controls['color'].value,
            date_issue: this.formatDate(
              this.carRegistration.controls['dateOfIssuance'].value
            ),
            seats: this.carRegistration.controls['numberOfSeats'].value,
            full_weight: this.carRegistration.controls['fullWeight'].value,
            empty_weight:
              this.carRegistration.controls['massWithoutLoad'].value,
            category: this.carRegistration.controls['category'].value,
            fuel: this.carRegistration.controls['typeOfFuel'].value,
            body_type: this.carRegistration.controls['bodyType'].value,
            engine_volume:
              this.carRegistration.controls['engineCapacity'].value,
            engine_power: this.carRegistration.controls['power'].value,
            environmental_standard:
              this.carRegistration.controls['ecologicalStandard'].value,
          },
        },
        using_reason_info: {
          num_and_name_contract:
            this.carRegistration.controls['contractNameAndNumber'].value,
          date_start: this.formatDate(
            this.carRegistration.controls['dateOfTheContract'].value
          ),
          is_contract_fixed_term:
            this.carRegistration.controls['contractIsFixedterm'].value,
          date_end: this.formatDate(
            this.carRegistration.controls['expiryDate'].value
          ),
          date_next_start: this.formatDate(
            this.carRegistration.controls['futureUsagePlans'].value
          ),
        },
        general_info: {
          mileage: this.carRegistration.controls['odonometerIndicator'].value,
          fuel_tank_volume:
            this.carRegistration.controls['fuelTankValue'].value,
          height: this.carRegistration.controls['height'].value,
          width: this.carRegistration.controls['width'].value,
          length: this.carRegistration.controls['length'].value,
        },
      },
    };
    this.transportService
      .saveNewTransport(transport)
      .subscribe((res) => this.router.navigate(['/main/cars/table']));
  }

  cancel(): void {
    this.router.navigate(['/main/cars/table']);
  }
}
