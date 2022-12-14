import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit-general-info',
  templateUrl: './user-edit-general-info.component.html',
  styleUrls: ['./user-edit-general-info.component.scss'],
})
export class UserEditGeneralInfoComponent implements OnInit {
  userEditForm!: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.fb.group({
      fio: ['Test Test', [Validators.required]],
      birthday: ['12.12.2022', [Validators.required]],
      // phone: [null, [Validators.required]],
      registrationAddress: ['Test test', [Validators.required]],
      email: ['kaneki@gmail.com', [Validators.required]],
      actualAddress: ['Test test', [Validators.required]],
      accOrderNumber: ['Test test', [Validators.required]],
      accOrderDate: ['12.12.2022', [Validators.required]],
      salary: [228, [Validators.required, Validators.pattern(/^[0-9]/)]],
      previousWorkExp: ['Test test', [Validators.required]],
      previousInfoWorkMp: ['Test test', [Validators.required]],
      sufficientExperienceMp: ['Test test', [Validators.required]],
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
