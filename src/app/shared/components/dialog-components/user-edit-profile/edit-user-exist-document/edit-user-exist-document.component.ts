import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailableDocuments } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-edit-user-exist-document',
  templateUrl: './edit-user-exist-document.component.html',
  styleUrls: ['./edit-user-exist-document.component.scss'],
})
export class EditUserExistDocumentComponent implements OnInit {
  userExistDocument!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userExistDocument = this.fb.group({
      passport: ['', [Validators.required]],
      ipn: ['', [Validators.required]],
      employmentHistory: ['', [Validators.required]],
      certificateNumber: ['', [Validators.required]],
      dateIssue: ['', [Validators.required]],
      dateNextReview: ['', [Validators.required]],
      militaryRegistrationDoc: ['', [Validators.required]],
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

  submit() {
    const _dateIssue = this.userExistDocument.controls['dateIssue'].value;
    const _dateNextReview =
      this.userExistDocument.controls['dateNextReview'].value;

    let dateIssue = this.formatDate(_dateIssue);
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
        date_issue: dateIssue,
        date_next_review: dateNextReview,
      },
    };
    this.userService
      .saveExistDocument(body)
      .subscribe((res) => console.log(res));
  }
}
