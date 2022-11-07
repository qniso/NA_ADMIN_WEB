import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initializeForm();

  }

  private initializeForm(): void{
    this.authForm = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      pass: [null, [Validators.required,Validators.minLength(8)]]
    })
  }

  submit(){
    let login = this.authForm.controls['login'].value
    console.log(login);
    let pass = this.authForm.controls['pass'].value

    this.auth.getAuth(login, pass).subscribe(res => {
      console.log(res);
    })
  }
}
