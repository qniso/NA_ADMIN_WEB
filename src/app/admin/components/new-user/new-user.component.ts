import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  switchPage: boolean = true;
  userForm !: FormGroup;
  roleList:any;

  constructor(
    private users : UsersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserRole();
  }


  private initializeForm(): void{
    this.userForm = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      pass: [null, [Validators.required]],
      roleSelect: [null, [Validators.required]]
    })
  }

  submit():void{
    // this.newUser();
    this.switchPage = false;
  }

  getUserRole():void{
    this.users.getRoles().subscribe(
      res => {
        this.roleList = res.roles;
        console.log(this.roleList);
      }
    );
  }

  newUser():void{
    const selectedRole = this.userForm.controls['roleSelect'].value;
    const user = {
      "login": this.userForm.controls['login'].value,
      "password": this.userForm.controls['pass'].value,
      "role": selectedRole.role
    }

    this.users.saveNewUser(user).subscribe();
  }
  cancel():void{
    this.router.navigate(['/main/admin/admin-dashboard/user-list']);
  }
  back():void{
    this.switchPage = true;
    
  }
}
