import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserEditEducationInfoComponent } from '../dialog-components/user-edit-education-info/user-edit-education-info.component';
import { UserEditGeneralInfoComponent } from '../dialog-components/user-edit-general-info/user-edit-general-info.component';
import { UserProfile } from '../../models/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo!: UserProfile | undefined;

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
    console.log(id);

    this.userService.getUserProfile(id).subscribe((res) => {
      this.userInfo = res;
      console.log(this.userInfo);
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
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
        break;
      }
    }
  }
}
