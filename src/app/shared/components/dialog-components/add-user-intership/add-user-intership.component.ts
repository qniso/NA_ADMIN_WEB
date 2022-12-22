import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInternship } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-user-intership',
  templateUrl: './add-user-intership.component.html',
  styleUrls: ['./add-user-intership.component.scss'],
})
export class AddUserIntershipComponent implements OnInit {
  userInternship!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userInternship = this.fb.group({
      docNumber: ['', [Validators.required]],
      date: ['', [Validators.required]],
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
    const _date = this.userInternship.controls['date'].value;
    let date = this.formatDate(_date);
    const body: UserInternship = {
      userId: this.userService.data.id,
      doc_number: this.userInternship.controls['docNumber'].value,
      date: date,
      type: 'INTERNSHIP',
    };
    this.userService.editUserInternship(body).subscribe();
  }
}
