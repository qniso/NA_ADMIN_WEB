import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AddUserEducationInfoComponent } from 'src/app/shared/components/dialog-components/add-user-education-info/add-user-education-info.component';

import { AddUserIntershipComponent } from 'src/app/shared/components/dialog-components/add-user-intership/add-user-intership.component';
import { EditUserExistDocumentComponent } from 'src/app/shared/components/dialog-components/edit-user-exist-document/edit-user-exist-document.component';
import { EditUserInstructionComponent } from 'src/app/shared/components/dialog-components/edit-user-instruction/edit-user-instruction.component';
import { EditUserIntershipComponent } from 'src/app/shared/components/dialog-components/edit-user-intership/edit-user-intership.component';
import { UserAddDriverLicenseComponent } from 'src/app/shared/components/dialog-components/user-add-driver-license/user-add-driver-license.component';
import { UserEditDriverLicenseComponent } from 'src/app/shared/components/dialog-components/user-edit-driver-license/user-edit-driver-license.component';
import { UserEditEducationInfoComponent } from 'src/app/shared/components/dialog-components/user-edit-education-info/user-edit-education-info.component';
import { UserEditGeneralInfoComponent } from 'src/app/shared/components/dialog-components/user-edit-general-info/user-edit-general-info.component';

import {
  UserDriverLicense,
  UserProfile,
} from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userInfo!: UserProfile;
  result: any;
  userDriverLicense!: UserDriverLicense | undefined;
  userId!: number | null;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userId = id;
    this.getProfile(id);
  }

  getProfile(id: number): void {
    this.userService
      .getUserProfile(id)
      .subscribe((res) => (this.userInfo = res));
  }

  editGeneralInfo(): void {
    const dialogRef = this.dialog.open(UserEditGeneralInfoComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  editUserEducationInfo(
    id: number,
    educationCertificate: string,
    educationSpecialty: string,
    educationAdvancedQualification: string
  ): void {
    const dialogRef = this.dialog.open(UserEditEducationInfoComponent, {
      height: '70%',
      width: '70%',
    });
    const body = {
      id: id,
      certificate: educationCertificate,
      specialty: educationSpecialty,
      advancedQualification: educationAdvancedQualification,
    };
    this.userService.userEducation$$.next(body);

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  addUserEducationInfo(): void {
    const dialogRef = this.dialog.open(AddUserEducationInfoComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  addDriverLicense(): void {
    const dialogRef = this.dialog.open(UserAddDriverLicenseComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  editDriverLicense(): void {
    const dialogRef = this.dialog.open(UserEditDriverLicenseComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  editExistDocument(): void {
    const dialogRef = this.dialog.open(EditUserExistDocumentComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  addUserInternship(): void {
    const dialogRef = this.dialog.open(AddUserIntershipComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  editUserInternship(id: number, docNumber: string, date: string): void {
    const dialogRef = this.dialog.open(EditUserIntershipComponent, {
      height: '70%',
      width: '70%',
    });

    const body = {
      id: id,
      doc_number: docNumber,
      date: date,
    };
    this.userService.userInternship$$.next(body);
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  addUserInstruction(): void {
    const dialogRef = this.dialog.open(EditUserInstructionComponent, {
      height: '70%',
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  deleteEducation(id: number): void {
    this.userService
      .deleteUserEducation({
        id: id,
        userId: this.userService.data.id,
      })
      .subscribe();
    location.reload();
  }

  deleteInternsip(id: number): void {
    this.userService
      .deleteUserInternship({
        id: id,
        userId: this.userService.data.id,
      })
      .subscribe();
    location.reload();
  }

  deleteDrivingLicense(id: number): void {
    const body = {
      userId: id,
    };
    console.log(body);

    this.userService.deleteUserDrivingLicense(body).subscribe();
    location.reload();
  }

  deleteInstruction(id: number): void {
    this.userService
      .deleteUserInternship({
        id: id,
        userId: this.userService.data.id,
      })
      .subscribe();
    location.reload();
  }
}
