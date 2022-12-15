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
      birthday: [this.userService.data.birthday, [Validators.required]],
      // phone: [null, [Validators.required]],
      registrationAddress: ['', [Validators.required]],
      email: [
        this.userService.data.registration_address,
        [Validators.required],
      ],
      actualAddress: [
        this.userService.data.actual_address,
        [Validators.required],
      ],
      accOrderNumber: [
        this.userService.data.acc_order_number,
        [Validators.required],
      ],
      accOrderDate: [
        this.userService.data.acc_order_date,
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

  submit(): void {
    const userProfile = {
      email: this.userEditForm.controls['email'].value,
      fio: this.userEditForm.controls['fio'].value,
      acc_order_number: this.userEditForm.controls['accOrderNumber'].value,
      acc_order_date: this.userEditForm.controls['accOrderDate'].value,
      salary: this.userEditForm.controls['salary'].value,
      birthday: this.userEditForm.controls['birthday'].value,
      previous_work_exp: this.userEditForm.controls['previousWorkExp'].value,
      previous_info_work_mp:
        this.userEditForm.controls['previousInfoWorkMp'].value,
      sufficient_experience_mp:
        this.userEditForm.controls['sufficientExperienceMp'].value,
      actual_address: this.userEditForm.controls['actualAddress'].value,
      registration_address:
        this.userEditForm.controls['registrationAddress'].value,
    };
  }
}
