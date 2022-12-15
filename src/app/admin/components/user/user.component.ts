import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserEditEducationInfoComponent } from 'src/app/shared/components/dialog-components/user-edit-education-info/user-edit-education-info.component';
import { UserEditGeneralInfoComponent } from 'src/app/shared/components/dialog-components/user-edit-general-info/user-edit-general-info.component';
import { UserProfile } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
    }
  }
}
