import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  userInfo!: UserProfile | undefined;
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
    this.userService.getUserProfile(id).subscribe((res) => {
      this.userInfo = res;
    });
  }
  openDialog(item: string): void {
    switch (item) {
      case 'general': {
        const dialogRef = this.dialog.open(UserEditGeneralInfoComponent, {
          height: '70%',
          width: '70%',
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
        break;
      }
      case 'education': {
        const dialogRef = this.dialog.open(UserEditEducationInfoComponent, {
          height: '70%',
          width: '70%',
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
        break;
      }
      case 'addDriverLicense': {
        const dialogRef = this.dialog.open(UserAddDriverLicenseComponent, {
          height: '70%',
          width: '70%',
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
        break;
      }
      case 'editDriverLicense': {
        const dialogRef = this.dialog.open(UserEditDriverLicenseComponent, {
          height: '70%',
          width: '70%',
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
        break;
      }
    }
  }
}
