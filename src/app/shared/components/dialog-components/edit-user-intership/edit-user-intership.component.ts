import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { UserInternship } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'edit-user-intership',
  templateUrl: './edit-user-intership.component.html',
  styleUrls: ['./edit-user-intership.component.scss'],
})
export class EditUserIntershipComponent implements OnInit {
  userInternship!: FormGroup;
  userInternshipInfo = this.userService.userInternship$$;
  data: any;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.userInternshipInfo.pipe(map((res) => (this.data = res))).subscribe();

    this.initializeForm();
  }

  private initializeForm(): void {
    this.userInternship = this.fb.group({
      docNumber: [this.data.doc_number, [Validators.required]],
      date: [this.convertToDate(this.data.date), [Validators.required]],
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

  submit() {
    const _date = this.userInternship.controls['date'].value;
    let date = this.formatDate(_date);
    const body: UserInternship = {
      id: this.data.id,
      userId: this.userService.data.id,
      doc_number: this.userInternship.controls['docNumber'].value,
      date: date,
      type: 'INTERNSHIP',
    };

    this.userService.editUserInternship(body).subscribe();
  }
}
