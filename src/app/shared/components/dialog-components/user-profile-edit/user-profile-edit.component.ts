import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import {
  AvailableDocuments,
  UserDriverLicense,
  UserInternship,
  UserUnstruction,
} from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
  userEditForm!: FormGroup;
  userEducation!: FormGroup;
  userDriverLicense!: FormGroup;
  userExistDocument!: FormGroup;
  userInternship!: FormGroup;
  userInstruction!: FormGroup;

  userEducationId: number | undefined;
  userInternshipId: number | undefined;

  editModalKey!: string | undefined;

  userObject = this.userService.userProfile$$;
  driverCategories: string[] = this.userService.data.driving_license.categories;

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
      case 'editDriverLicense':
        this.userDriverLicense = this.fb.group({
          categories: [
            this.userService.data.driving_license.categories[0],
            [Validators.required],
          ],
          dateIssue: [
            this.convertToDate(
              this.userService.data.driving_license.date_issue
            ),
            [Validators.required],
          ],
          dateEnd: [
            this.convertToDate(this.userService.data.driving_license.date_end),
            [Validators.required],
          ],
        });
        break;
      case 'addDriverLicense':
        this.userDriverLicense = this.fb.group({
          categories: ['', [Validators.required]],
          dateIssue: ['', [Validators.required]],
          dateEnd: ['', [Validators.required]],
        });
        break;
      case 'editExistDocument':
        this.userExistDocument = this.fb.group({
          passport: ['', [Validators.required]],
          ipn: ['', [Validators.required]],
          employmentHistory: ['', [Validators.required]],
          certificateNumber: ['', [Validators.required]],
          dateIssue: ['', [Validators.required]],
          dateNextReview: ['', [Validators.required]],
          militaryRegistrationDoc: ['', [Validators.required]],
        });
        break;
      case 'addUserInternship':
        this.userInternship = this.fb.group({
          docNumber: ['', [Validators.required]],
          date: ['', [Validators.required]],
        });
        break;
      case 'editUserInternship':
        this.userService.userInternship$.subscribe((res) => {
          this.userInternshipId = res.id;
          this.userInternship = this.fb.group({
            docNumber: [res.doc_number, [Validators.required]],
            date: [this.convertToDate(res.date), [Validators.required]],
          });
        });

        break;
      case 'addUserInstruction':
        this.userInstruction = this.fb.group({
          docNumber: ['', [Validators.required]],
          date: ['', [Validators.required]],
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
      case 'editDriverLicense':
        const _dateIssue = this.userDriverLicense.controls['dateIssue'].value;
        const _dateEnd = this.userDriverLicense.controls['dateEnd'].value;
        let dateIssue = this.formatDate(_dateIssue);
        let dateEnd = this.formatDate(_dateEnd);
        const editDriverLicense: UserDriverLicense = {
          userId: this.userService.data.id,
          categories: this.driverCategories.concat(
            this.userDriverLicense.controls['categories'].value
          ),
          date_issue: dateIssue,
          date_end: dateEnd,
        };
        this.userService.editUserDriverLicense(editDriverLicense).subscribe();
        break;
      case 'addDriverLicense':
        const _dateIssueDriverLicense =
          this.userDriverLicense.controls['dateIssue'].value.toISOString();
        const _dateEndDriverLicense =
          this.userDriverLicense.controls['dateEnd'].value.toISOString();

        const category: string =
          this.userDriverLicense.controls['categories'].value;

        let dateIssueDriverLicense = this.formatDate(_dateIssueDriverLicense);
        let dateEndDriverLicense = this.formatDate(_dateEndDriverLicense);

        const addDriverLicense: UserDriverLicense = {
          userId: this.userService.data.id,
          categories: [category],
          date_issue: dateIssueDriverLicense,
          date_end: dateEndDriverLicense,
        };
        console.log(addDriverLicense);

        this.userService.addUserDriverLicense(addDriverLicense).subscribe();
        break;
      case 'editExistDocument':
        const _dateIssueExistDocumen =
          this.userExistDocument.controls['dateIssue'].value;
        const _dateNextReview =
          this.userExistDocument.controls['dateNextReview'].value;

        let dateIssueExistDocument = this.formatDate(_dateIssueExistDocumen);
        let dateNextReview = this.formatDate(_dateNextReview);

        const body: AvailableDocuments = {
          userId: this.userService.data.id,
          passport: this.userExistDocument.controls['passport'].value,
          ipn: this.userExistDocument.controls['ipn'].value,
          employment_history:
            this.userExistDocument.controls['employmentHistory'].value,
          military_registration_doc:
            this.userExistDocument.controls['militaryRegistrationDoc'].value,
          health_certificate: {
            certificate_number:
              this.userExistDocument.controls['certificateNumber'].value,
            date_issue: dateIssueExistDocument,
            date_next_review: dateNextReview,
          },
        };
        this.userService
          .saveExistDocument(body)
          .subscribe((res) => console.log(res));
        break;
      case 'addUserInternship':
        const _date = this.userInternship.controls['date'].value;
        let date = this.formatDate(_date);
        const addUserInternship: UserInternship = {
          userId: this.userService.data.id,
          doc_number: this.userInternship.controls['docNumber'].value,
          date: date,
          type: 'INTERNSHIP',
        };
        this.userService.editUserInternship(addUserInternship).subscribe();
        break;
      case 'editUserInternship':
        const _dateUserInternship = this.userInternship.controls['date'].value;
        let dateUserInternship = this.formatDate(_dateUserInternship);
        const userInternship: UserInternship = {
          id: this.userInternshipId,
          userId: this.userService.data.id,
          doc_number: this.userInternship.controls['docNumber'].value,
          date: dateUserInternship,
          type: 'INTERNSHIP',
        };
        this.userService.editUserInternship(userInternship).subscribe();
        break;
      case 'addUserInstruction':
        const _dateUserInstruction =
          this.userInstruction.controls['date'].value;
        let dateUserInstruction = this.formatDate(_dateUserInstruction);

        const userInstruction: UserUnstruction = {
          userId: this.userService.data.id,
          doc_number: this.userInstruction.controls['docNumber'].value,
          date: dateUserInstruction,
          type: 'INSTRUCTION',
        };

        this.userService.editUserInternship(userInstruction).subscribe();
        break;
      default:
        break;
    }
  }
}