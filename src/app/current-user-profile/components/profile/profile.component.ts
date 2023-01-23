import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProfileEditComponent } from 'src/app/shared/components/dialog-components/user-profile-edit/user-profile-edit.component';
import {
  UserDriverLicense,
  UserProfile,
} from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
    this.getProfile();
  }

  getProfile(): void {
    this.userService.getUserProfile().subscribe((res) => {
      this.userInfo = res;
    });
  }

  openEditModal(value: string): void {
    switch (value) {
      case 'userProfile':
        this.userService.editKey$$.next(value);
        break;
      case 'addEducationInfo':
        this.userService.editKey$$.next(value);
        break;
      case 'editEducation':
        this.userService.editKey$$.next(value);
        break;
      case 'addDriverLicense':
        this.userService.editKey$$.next(value);
        break;
      case 'editDriverLicense':
        this.userService.editKey$$.next(value);
        break;
      case 'editExistDocument':
        this.userService.editKey$$.next(value);
        break;
      case 'addUserInternship':
        this.userService.editKey$$.next(value);
        break;
      case 'editUserInternship':
        this.userService.editKey$$.next(value);
        break;
      case 'addUserInstruction':
        this.userService.editKey$$.next(value);
        break;
      case 'editUserInstruction':
        this.userService.editKey$$.next(value);
        break;
      default:
        break;
    }

    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  saveEducationData(
    id: number,
    certificate: string,
    specialty: string,
    advancedQualification: string
  ): void {
    const data = {
      id: id,
      certificate: certificate,
      specialty: specialty,
      advanced_qualification: advancedQualification,
    };
    this.userService.userEducation$$.next(data);
  }

  saveInternshipData(id: number, docNumber: string, date: string): void {
    const data = {
      id: id,
      doc_number: docNumber,
      date: date,
    };
    this.userService.userInternship$$.next(data);
  }

  deleteEducation(id: number): void {
    this.userService
      .deleteUserEducation({
        id: id,
      })
      .subscribe(() => location.reload());
  }

  deleteInternsip(id: number): void {
    this.userService
      .deleteUserInternship({
        id: id,
      })
      .subscribe(() => location.reload());
  }

  deleteDrivingLicense(id?: number): void {
    this.userService.deleteUserDrivingLicense().subscribe(() => {
      location.reload();
    });
  }

  deleteInstruction(id: number): void {
    this.userService
      .deleteUserInternship({
        id: id,
      })
      .subscribe(() => {
        location.reload();
      });
  }
}
