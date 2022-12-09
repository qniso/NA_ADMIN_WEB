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
    children:[
      {
        path:'company',
        loadChildren: () => import('../companies/companies.module').then(m => m.CompaniesModule),
        canActivate:[AuthGuard, RoleGuard],
        data: {
          roles: [Roles.SUPER_ADMIN]
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        canActivate:[AuthGuard, RoleGuard],
        data: {
          roles: [Roles.SUPER_ADMIN,Roles.DIRECTOR]
        }
      },
      {
        path: 'cars',
        loadChildren: () => import('../cars/cars.module').then(m => m.CarsModule),
        canActivate:[AuthGuard, RoleGuard],
        data: {
          roles: [Roles.SUPER_ADMIN,Roles.DIRECTOR]
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
