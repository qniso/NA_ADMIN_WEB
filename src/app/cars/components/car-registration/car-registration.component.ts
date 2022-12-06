import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transport } from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.scss']
})
export class CarRegistrationComponent implements OnInit {
  
  carRegistration!:FormGroup

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void{
    this.carRegistration = this.fb.group({
      nomenclatureName: ["test", [Validators.required]],
      technicalPassportSeries: ["test", [Validators.required]],
      technicalPassportIssuedBy: ["test", [Validators.required]],
      validUntil: ["14.12.2024", [Validators.required]],
      dateOfIssuance: ["14.12.2022", [Validators.required]],
      brand:["test", [Validators.required]],
      governmentNumber: ["test", [Validators.required]],
      VINCode: ["test", [Validators.required]],
      color: ["test", [Validators.required]],
      numberOfSeats: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      fullWeight: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      massWithoutLoad:[0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      category:["test", [Validators.required]],
      typeOfFuel: ["GAS_GASOLINE", [Validators.required]],
      bodyType: ["test", [Validators.required]],
      engineCapacity: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      power: [0, [Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      ecologicalStandard: ["EURO_1", [Validators.required]],
      contractNameAndNumber: ["test", [Validators.required]],
      dateOfTheContract: ["12.10.2022", [Validators.required]],
      contractIsFixedterm: [true, [Validators.required]],
      expiryDate: ["12.12.2022", [Validators.required]],
      futureUsagePlans: ["12.12.2024", [Validators.required]],
      odonometerIndicator: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      fuelTankValue: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      height: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      width: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
      length: [0, [
        Validators.required, 
        Validators.pattern(/^[0-9]/)]
      ],
    })
  }

  submit():void{
    const transport: Transport = {
        transport_card: {
            nomenclature_name: this.carRegistration.controls['nomenclatureName'].value,
            technical_certificate: {
                num_and_series: this.carRegistration.controls['technicalPassportSeries'].value,
                issued_by: this.carRegistration.controls['technicalPassportIssuedBy'].value,
                date_end: this.carRegistration.controls['validUntil'].value,
                date_issue: this.carRegistration.controls['dateOfIssuance'].value,
                technical_certificate_dop_info: {
                    brand: this.carRegistration.controls['brand'].value,
                    state_number: this.carRegistration.controls['governmentNumber'].value,
                    VIN_code: this.carRegistration.controls['VINCode'].value,
                    colour: this.carRegistration.controls['color'].value,
                    date_issue: this.carRegistration.controls['dateOfIssuance'].value,
                    seats: this.carRegistration.controls['numberOfSeats'].value,
                    full_weight:this.carRegistration.controls['fullWeight'].value,
                    empty_weight: this.carRegistration.controls['massWithoutLoad'].value,
                    category: this.carRegistration.controls['category'].value,
                    fuel: this.carRegistration.controls['typeOfFuel'].value,
                    body_type: this.carRegistration.controls['bodyType'].value,
                    engine_volume: this.carRegistration.controls['engineCapacity'].value,
                    engine_power:this.carRegistration.controls['power'].value,
                    environmental_standard: this.carRegistration.controls['ecologicalStandard'].value,
                }
            },
            using_reason_info: {
                num_and_name_contract:this.carRegistration.controls['contractNameAndNumber'].value,
                date_start: this.carRegistration.controls['dateOfTheContract'].value,
                is_contract_fixed_term:this.carRegistration.controls['contractIsFixedterm'].value,
                date_end:this.carRegistration.controls['expiryDate'].value,
                date_next_start:this.carRegistration.controls['futureUsagePlans'].value,
            },
            general_info:{
                mileage:this.carRegistration.controls['odonometerIndicator'].value,
                fuel_tank_volume:this.carRegistration.controls['fuelTankValue'].value,
                height:this.carRegistration.controls['height'].value,
                width:this.carRegistration.controls['width'].value,
                length:this.carRegistration.controls['length'].value,
            }
        }
    }
    this.transportService.saveNewTransport(transport).subscribe(
      res => this.router.navigate(['/main/cars/table']));    
  }
  
  cancel():void{
    this.router.navigate(['/main/cars/table']);
  }


}
