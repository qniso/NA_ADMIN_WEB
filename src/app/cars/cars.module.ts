import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarTableComponent } from './components/car-table/car-table.component';
import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CarRegistrationComponent } from './components/car-registration/car-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarTableComponent,
    CarRegistrationComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CarsModule { }