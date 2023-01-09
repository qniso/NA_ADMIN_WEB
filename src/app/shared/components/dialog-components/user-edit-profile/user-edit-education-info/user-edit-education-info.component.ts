import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserEducation } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'user-edit-education-info',
  templateUrl: './user-edit-education-info.component.html',
  styleUrls: ['./user-edit-education-info.component.scss'],
})
export class UserEditEducationInfoComponent implements OnInit {
  userEducation!: FormGroup;
  userObject = this.userService.userProfile$$;
  data: any;
  userEducationInfo = this.userService.userEducation$$;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userEducationInfo.pipe(map((res) => (this.data = res))).subscribe();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEducation = this.fb.group({
      certificate: [this.data.certificate, [Validators.required]],
      specialty: [this.data.specialty, [Validators.required]],
      advancedQualification: [
        this.data.advancedQualification,
        [Validators.required],
      ],
    });
  }

  submit(): void {
    const education = {
      id: this.data.id,
      userId: this.userService.data.id,
      certificate: this.userEducation.controls['certificate'].value,
      specialty: this.userEducation.controls['specialty'].value,
      advanced_qualification:
        this.userEducation.controls['advancedQualification'].value,
    };
    this.userService.editUserEducation(education).subscribe();
  }

  delete() {
    const body = {
      id: this.data.id,
      userId: this.userService.data.id,
    };
    this.userService.deleteUserEducation(body).subscribe();
  }
}
