import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'new-user',
        component: NewUserComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'user-info',
        component: UserComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
