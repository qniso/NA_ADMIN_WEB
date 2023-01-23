import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { Roles } from '../shared/models/roles.model';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'company',
        loadChildren: () =>
          import('../companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('../cars/cars.module').then((m) => m.CarsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../current-user-profile/current-user-profile.module').then(
            (m) => m.CurrentUserProfileModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
