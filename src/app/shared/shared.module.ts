import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditGeneralInfoComponent } from './components/dialog-components/user-edit-general-info/user-edit-general-info.component';
import { UserEditEducationInfoComponent } from './components/dialog-components/user-edit-education-info/user-edit-education-info.component';

import { UserAccessDirective } from './directives/user-access.directive';

//MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { UserEditDriverLicenseComponent } from './components/dialog-components/user-edit-driver-license/user-edit-driver-license.component';
import { UserAddDriverLicenseComponent } from './components/dialog-components/user-add-driver-license/user-add-driver-license.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TableComponent,
    AdminNavComponent,
    UserTableComponent,
    CarListComponent,
    UserProfileComponent,
    UserAccessDirective,
    UserEditGeneralInfoComponent,
    UserEditEducationInfoComponent,
    UserEditDriverLicenseComponent,
    UserAddDriverLicenseComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //MATERIAL
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    TableComponent,
    UserTableComponent,
    AdminNavComponent,
    CarListComponent,
    UserProfileComponent,
    RouterModule,
    UserAccessDirective,
    //MATERIAL
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
