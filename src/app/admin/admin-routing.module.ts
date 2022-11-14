import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { RolesComponent } from './components/roles/roles.component';


const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminComponent,
    children:[

      {
        path:"roles",
        component: RolesComponent
      },
      {
        path: "dashboard",
        component:DashboardComponent
      },
      {
        path: "new-user",
        component: NewUserComponent
      }
    ]
  },

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
