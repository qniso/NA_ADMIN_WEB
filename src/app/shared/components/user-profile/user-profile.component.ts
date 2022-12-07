import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userId!: number;

  userEditForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
    
    this.initializeForm();
  }
  
  private initializeForm(): void{
    this.userEditForm = this.fb.group({
      fio: ['Test Test', [Validators.required]],
      birthday: ['12.12.2022', [Validators.required]],
      // phone: [null, [Validators.required]],
      registrationAddress: ['Test test', [Validators.required]],
      email: ['kaneki@gmail.com', [Validators.required]],
      actualAddress: ['Test test', [Validators.required]],
      accOrderNumber: ['Test test', [Validators.required]],
      accOrderDate: ['12.12.2022', [Validators.required]],
      salary: [228, 
        [
        Validators.required,
        Validators.pattern(/^[0-9]/)
        ]
      ],
      previousWorkExp: ['Test test', [Validators.required]],
      previousInfoWorkMp: ['Test test', [Validators.required]],
      sufficientExperienceMp: ['Test test', [Validators.required]],
    })
  }


  submit(): void{
    const userProfile = {
      id : this.userId,
      email: this.userEditForm.controls['email'].value,
      fio:this.userEditForm.controls['fio'].value,
      acc_order_number:this.userEditForm.controls['accOrderNumber'].value,
      acc_order_date:this.userEditForm.controls['accOrderDate'].value,
      salary: this.userEditForm.controls['salary'].value,
      birthday: this.userEditForm.controls['birthday'].value,
      previous_work_exp: this.userEditForm.controls['previousWorkExp'].value,
      previous_info_work_mp:this.userEditForm.controls['previousInfoWorkMp'].value,
      sufficient_experience_mp:this.userEditForm.controls['sufficientExperienceMp'].value,
      actual_address: this.userEditForm.controls['actualAddress'].value,
      registration_address: this.userEditForm.controls['registrationAddress'].value,
    }
    this.userService.saveUserProfile(userProfile).subscribe(res => console.log(res));
    this.router.navigate(['/main/admin/admin-dashboard/user-list'])
  }
}
