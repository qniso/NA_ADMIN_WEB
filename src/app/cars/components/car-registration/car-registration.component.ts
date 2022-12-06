import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.scss']
})
export class CarRegistrationComponent implements OnInit {
  
  carRegistration!:FormGroup

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void{
    this.carRegistration = this.fb.group({
      nomenclatureName: ["test", [Validators.required]],
      technicalPassportSeries: ["test", [Validators.required]],
      technicalPassportIssuedBy: ["test", [Validators.required]],
      validUntil: ["test", [Validators.required]],
      dateOfIssuance: ["test", [Validators.required]],
      brand:["test", [Validators.required]],
      governmentNumber: ["test", [Validators.required]],
      VINCode: ["test", [Validators.required]],
      color: ["test", [Validators.required]],
      numberOfSeats: ["test", [Validators.required]],
      fullWeight: ["test", [Validators.required]],
      massWithoutLoad:["test", [Validators.required]],
      category:["test", [Validators.required]],
      typeOfFuel: ["test", [Validators.required]],
      bodyType: ["test", [Validators.required]],
      engineCapacity: ["test", [Validators.required]],
      power: ["test", [Validators.required]],
      ecologicalStandard: ["test", [Validators.required]],
      contractNameAndNumber: ["test", [Validators.required]],
      dateOfTheContract: ["test", [Validators.required]],
      contractIsFixedterm: ["test", [Validators.required]],
      expiryDate: ["test", [Validators.required]],
      futureUsagePlans: ["test", [Validators.required]],
      odonometerIndicator: ["test", [Validators.required]],
      fuelTankValue: ["test", [Validators.required]],
      height: ["test", [Validators.required]],
      width: ["test", [Validators.required]],
      length: ["test", [Validators.required]],
    })
  }

  submit():void{
    console.log(true);
    
  }

}
