import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
  userEditForm!: FormGroup;
  userEducation!: FormGroup;
  userEducationId: number | undefined;

  editModalKey!: string | undefined;
  userObject = this.userService.userProfile$$;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userService.editKey$.subscribe((res) => (this.editModalKey = res));
    this.initializeForm();
  }

  private initializeForm(): void {
    switch (this.editModalKey) {
      case 'userProfile':
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
        break;
      case 'addEducationInfo':
        this.userEducation = this.fb.group({
          certificate: ['', [Validators.required]],
          specialty: ['', [Validators.required]],
          advancedQualification: ['', [Validators.required]],
        });
        break;
      case 'editEducation':
        this.userService.userEducation$.subscribe((res) => {
          this.userEducationId = res.id;
          this.userEducation = this.fb.group({
            certificate: [res.certificate, [Validators.required]],
            specialty: [res.specialty, [Validators.required]],
            advancedQualification: [
              res.advanced_qualification,
              [Validators.required],
            ],
          });
        });
        break;
    }
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
    switch (this.editModalKey) {
      case 'userProfile':
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
          previous_work_exp:
            this.userEditForm.controls['previousWorkExp'].value,
          previous_info_work_mp:
            this.userEditForm.controls['previousInfoWorkMp'].value,
          sufficient_experience_mp:
            this.userEditForm.controls['sufficientExperienceMp'].value,
          actual_address: this.userEditForm.controls['actualAddress'].value,
          registration_address:
            this.userEditForm.controls['registrationAddress'].value,
        };
        this.userService.saveUserProfile(userProfile).subscribe();
        break;
      case 'addEducationInfo':
        const addEducation = {
          userId: this.userService.data.id,
          certificate: this.userEducation.controls['certificate'].value,
          specialty: this.userEducation.controls['specialty'].value,
          advanced_qualification:
            this.userEducation.controls['advancedQualification'].value,
        };
        this.userService.saveUserEducation(addEducation).subscribe();
        break;
      case 'editEducation':
        const editEducation = {
          id: this.userEducationId,
          userId: this.userService.data.id,
          certificate: this.userEducation.controls['certificate'].value,
          specialty: this.userEducation.controls['specialty'].value,
          advanced_qualification:
            this.userEducation.controls['advancedQualification'].value,
        };
        this.userService.editUserEducation(editEducation).subscribe();
        break;
      default:
        break;
    }
  }
}
