import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-user-education-info',
  templateUrl: './add-user-education-info.component.html',
  styleUrls: ['./add-user-education-info.component.scss'],
})
export class AddUserEducationInfoComponent implements OnInit {
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
    location.reload();
  }
}
