import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserUnstruction } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'edit-user-instruction',
  templateUrl: './edit-user-instruction.component.html',
  styleUrls: ['./edit-user-instruction.component.scss'],
})
export class EditUserInstructionComponent implements OnInit {
  userInstruction!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userInstruction = this.fb.group({
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
    const _date = this.userInstruction.controls['date'].value;
    let date = this.formatDate(_date);

    const body: UserUnstruction = {
      userId: this.userService.data.id,
      doc_number: this.userInstruction.controls['docNumber'].value,
      date: date,
      type: 'INSTRUCTION',
    };

    this.userService.editUserInternship(body).subscribe();
    location.reload();
  }
}
