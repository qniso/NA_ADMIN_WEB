import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userId!: number;

  userEditForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEditForm = this.fb.group({
      fio: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      registrationAddress: ['', [Validators.required]],
      email: ['', [Validators.required]],
      actualAddress: ['', [Validators.required]],
      accOrderNumber: ['', [Validators.required]],
      accOrderDate: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      previousWorkExp: ['', [Validators.required]],
      previousInfoWorkMp: ['', [Validators.required]],
      sufficientExperienceMp: ['', [Validators.required]],
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

  submit(): void {
    const userProfile = {
      id: this.userId,
      email: this.userEditForm.controls['email'].value,
      fio: this.userEditForm.controls['fio'].value,
      phone: this.userEditForm.controls['phone'].value,
      acc_order_number: this.userEditForm.controls['accOrderNumber'].value,
      acc_order_date: this.formatDate(
        this.userEditForm.controls['accOrderDate'].value
      ),
      salary: this.userEditForm.controls['salary'].value,
      birthday: this.formatDate(this.userEditForm.controls['birthday'].value),
      previous_work_exp: this.userEditForm.controls['previousWorkExp'].value,
      previous_info_work_mp:
        this.userEditForm.controls['previousInfoWorkMp'].value,
      sufficient_experience_mp:
        this.userEditForm.controls['sufficientExperienceMp'].value,
      actual_address: this.userEditForm.controls['actualAddress'].value,
      registration_address:
        this.userEditForm.controls['registrationAddress'].value,
    };
    this.userService
      .saveUserProfile(userProfile)
      .subscribe((res) => console.log(res));
    this.router.navigate(['/main/admin/admin-dashboard/user-list']);
    // Сделать проверку на респонс, если приходит ошибка, то не роутить
  }
}
