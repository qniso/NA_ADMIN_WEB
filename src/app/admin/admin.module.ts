import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { RolesComponent } from './components/roles/roles.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    AdminComponent,
    RolesComponent,
    DashboardComponent,
    NewUserComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
