import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AddUserEducationInfoComponent } from './components/dialog-components/user-edit-profile/add-user-education-info/add-user-education-info.component';
import { AddUserIntershipComponent } from './components/dialog-components/user-edit-profile/add-user-intership/add-user-intership.component';
import { EditUserExistDocumentComponent } from './components/dialog-components/user-edit-profile/edit-user-exist-document/edit-user-exist-document.component';
import { EditUserInstructionComponent } from './components/dialog-components/user-edit-profile/edit-user-instruction/edit-user-instruction.component';
import { EditUserIntershipComponent } from './components/dialog-components/user-edit-profile/edit-user-intership/edit-user-intership.component';
import { UserAddDriverLicenseComponent } from './components/dialog-components/user-edit-profile/user-add-driver-license/user-add-driver-license.component';
import { UserEditDriverLicenseComponent } from './components/dialog-components/user-edit-profile/user-edit-driver-license/user-edit-driver-license.component';
import { UserEditEducationInfoComponent } from './components/dialog-components/user-edit-profile/user-edit-education-info/user-edit-education-info.component';
import { UserEditGeneralInfoComponent } from './components/dialog-components/user-edit-profile/user-edit-general-info/user-edit-general-info.component';
import { EditUsingReasonComponent } from './components/dialog-components/car-edit-profile/edit-using-reason/edit-using-reason.component';

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
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { EditGeneralInfoComponent } from './components/dialog-components/car-edit-profile/edit-general-info/edit-general-info.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TableComponent,
    UserTableComponent,
    CarListComponent,
    UserProfileComponent,
    UserAccessDirective,
    UserEditGeneralInfoComponent,
    UserEditEducationInfoComponent,
    UserEditDriverLicenseComponent,
    UserAddDriverLicenseComponent,
    EditUserExistDocumentComponent,
    EditUserIntershipComponent,
    AddUserIntershipComponent,
    EditUserInstructionComponent,
    AddUserEducationInfoComponent,
    EditUsingReasonComponent,
    EditGeneralInfoComponent,
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
    MatMenuModule,
    MatRadioModule,
  ],
  exports: [
    NavbarComponent,
    TableComponent,
    UserTableComponent,
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
    MatMenuModule,
    MatRadioModule,
  ],
})
export class SharedModule {}
