import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';


const routes: Routes = [
  {
    path: 'company-list',
    component: CompanyListComponent
  },
  {
    path: 'company-list/register-new-company',
    component: AddCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
