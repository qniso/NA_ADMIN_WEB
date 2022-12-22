import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDriverLicense } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-add-driver-license',
  templateUrl: './user-add-driver-license.component.html',
  styleUrls: ['./user-add-driver-license.component.scss'],
})
export class UserAddDriverLicenseComponent implements OnInit {
  userDriverLicense!: FormGroup;
  userObject = this.userService.userProfile$$;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userDriverLicense = this.fb.group({
      categories: [
        this.userService.data.driving_license.categories[0],
        [Validators.required],
      ],
      dateIssue: [
        this.userService.data.driving_license.date_issue,
        [Validators.required],
      ],
      dateEnd: [
        this.userService.data.driving_license.date_end,
        [Validators.required],
      ],
    });
  }

  submit() {
    const _dateIssue = this.userDriverLicense.controls['dateIssue'].value;
    const _dateEnd = this.userDriverLicense.controls['dateEnd'].value;
    let dateIssue = this.formatDate(_dateIssue);
    let dateEnd = this.formatDate(_dateEnd);
    const body: UserDriverLicense = {
      userId: this.userService.data.id,
      categories: [this.userDriverLicense.controls['categories'].value],
      date_issue: dateIssue,
      date_end: dateEnd,
    };
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
