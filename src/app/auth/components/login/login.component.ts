import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenInterceptor } from 'src/app/shared/services/token.interceptor';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  errorHint: boolean = false;
  
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void{
    this.authForm = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      pass: [null, [Validators.required]]
    })
  }
  
  submit(){
    let login = this.authForm.controls['login'].value
    let pass = this.authForm.controls['pass'].value


    this.auth.getAuth(login, pass).subscribe(res => {
      if(res.error.code !== 0){
        this.authForm.controls['login'].setValue(null);
        this.authForm.controls['pass'].setValue(null);
        let result = `${JSON.stringify({"error": res.error})}`
        localStorage.setItem('error_NA',`${result}`);
        localStorage.removeItem('currentUser_NA');
        this.errorHint = true;
      }else{
        let result = `${JSON.stringify({"accessToken": res.accessToken})}`
        localStorage.removeItem('error_NA');
        localStorage.setItem('currentUser_NA',`${result}`);

        TokenInterceptor.accessToken = res.accessToken;
        this.router.navigate(['/main']);
      }
    })
   
  }
}
