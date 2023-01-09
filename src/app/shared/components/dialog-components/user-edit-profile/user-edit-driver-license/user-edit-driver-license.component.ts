import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDriverLicense } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-edit-driver-license',
  templateUrl: './user-edit-driver-license.component.html',
  styleUrls: ['./user-edit-driver-license.component.scss'],
})
export class UserEditDriverLicenseComponent implements OnInit {
  userDriverLicense!: FormGroup;
  userObject = this.userService.userProfile$$;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userDriverLicense = this.fb.group({
      categories: ['', [Validators.required]],
      dateIssue: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
    });
  }

  submit() {
    const _dateIssue =
      this.userDriverLicense.controls['dateIssue'].value.toISOString();
    const _dateEnd =
      this.userDriverLicense.controls['dateEnd'].value.toISOString();

    const category: string =
      this.userDriverLicense.controls['categories'].value;

    let dateIssue = this.formatDate(_dateIssue);
    let dateEnd = this.formatDate(_dateEnd);

    const body: UserDriverLicense = {
      userId: this.userService.data.id,
      categories: [category],
      date_issue: dateIssue,
      date_end: dateEnd,
    };
    console.log(body);

    this.userService.addUserDriverLicense(body).subscribe();
  }

  formatDate(value: any) {
    const date = new Date(value);

    let dd: any = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: any = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: any = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
  }
}
