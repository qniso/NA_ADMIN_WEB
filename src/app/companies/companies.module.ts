import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyListComponent } from './components/company-list/company-list.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';

import { CompaniesRoutingModule } from './companies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyListComponent,
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
