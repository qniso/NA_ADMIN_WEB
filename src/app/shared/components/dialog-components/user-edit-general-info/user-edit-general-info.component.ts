import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-edit-general-info',
  templateUrl: './user-edit-general-info.component.html',
  styleUrls: ['./user-edit-general-info.component.scss'],
})
export class UserEditGeneralInfoComponent implements OnInit {
  userEditForm!: FormGroup;
  userObject = this.userService.userProfile$$;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.fb.group({
      fio: [this.userService.data.fio, [Validators.required]],
      birthday: [
        this.convertToDate(this.userService.data.birthday),
        [Validators.required],
      ],
      phone: [this.userService.data.phone, [Validators.required]],
      registrationAddress: [
        this.userService.data.registration_address,
        [Validators.required],
      ],
      email: [this.userService.data.email, [Validators.required]],
      actualAddress: [
        this.userService.data.actual_address,
        [Validators.required],
      ],
      accOrderNumber: [
        this.userService.data.acc_order_number,
        [Validators.required],
      ],
      accOrderDate: [
        this.convertToDate(this.userService.data.acc_order_date),
        [Validators.required],
      ],
      salary: [
        this.userService.data.salary,
        [Validators.required, Validators.pattern(/^[0-9]/)],
      ],
      previousWorkExp: [
        this.userService.data.previous_work_exp,
        [Validators.required],
      ],
      previousInfoWorkMp: [
        this.userService.data.previous_info_work_mp,
        [Validators.required],
      ],
      sufficientExperienceMp: [
        this.userService.data.sufficient_experience_mp,
        [Validators.required],
      ],
    });
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

  convertToDate(value: any) {
    const date = value;
    let dd: any = date.split('.')[0];
    let mm: any = date.split('.')[1];
    let yy: any = date.split('.')[2];
    return new Date(yy, mm - 1, dd);
  }

  submit(): void {
    const _birthday =
      this.userEditForm.controls['birthday'].value.toISOString();
    const _accOrderDate =
      this.userEditForm.controls['accOrderDate'].value.toISOString();

    let birthday = this.formatDate(_birthday);
    let accOrderDate = this.formatDate(_accOrderDate);

    const userProfile = {
      id: this.userService.data.id,
      email: this.userEditForm.controls['email'].value,
      phone: this.userEditForm.controls['phone'].value,
      fio: this.userEditForm.controls['fio'].value,
      acc_order_number: this.userEditForm.controls['accOrderNumber'].value,
      acc_order_date: accOrderDate,
      salary: this.userEditForm.controls['salary'].value,
      birthday: birthday,
      previous_work_exp: this.userEditForm.controls['previousWorkExp'].value,
      previous_info_work_mp:
        this.userEditForm.controls['previousInfoWorkMp'].value,
      sufficient_experience_mp:
        this.userEditForm.controls['sufficientExperienceMp'].value,
      actual_address: this.userEditForm.controls['actualAddress'].value,
      registration_address:
        this.userEditForm.controls['registrationAddress'].value,
    };
    this.userService.saveUserProfile(userProfile).subscribe();
  }
}
