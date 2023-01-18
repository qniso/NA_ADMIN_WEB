import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

const routes: Routes = [
  {
    path: 'company-list',
    component: CompanyListComponent,
  },
  {
    path: 'company-info/:id',
    component: CompanyEditComponent,
  },
  {
    path: 'company-list/register-new-company',
    component: AddCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
