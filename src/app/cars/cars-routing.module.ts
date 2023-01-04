import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarRegistrationComponent } from './components/car-registration/car-registration.component';
import { CarTableComponent } from './components/car-table/car-table.component';

const routes: Routes = [
  {
    path: 'table',
    component: CarTableComponent,
  },

  {
    path: 'car-registration',
    component: CarRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
