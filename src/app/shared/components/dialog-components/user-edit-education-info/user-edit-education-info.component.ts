import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-edit-education-info',
  templateUrl: './user-edit-education-info.component.html',
  styleUrls: ['./user-edit-education-info.component.scss'],
})
export class UserEditEducationInfoComponent implements OnInit {
  userEducation!: FormGroup;
  userObject = this.userService.userProfile$$;
  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.userEducation = this.fb.group({
      certificate: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      advancedQualification: ['', [Validators.required]],
    });
  }

  submit(): void {
    const education = {
      userId: this.userService.data.id,
      certificate: this.userEducation.controls['certificate'].value,
      specialty: this.userEducation.controls['specialty'].value,
      advanced_qualification:
        this.userEducation.controls['advancedQualification'].value,
    };
    this.userService.saveUserEducation(education).subscribe();
  }

  delete() {
    const body = {
      userId: this.userService.data.id,
    };
    this.userService.deleteUserEducation(body).subscribe();
  }
}
