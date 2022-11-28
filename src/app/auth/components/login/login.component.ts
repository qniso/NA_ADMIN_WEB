import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TokenInterceptor } from 'src/app/shared/services/token.interceptor';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  authForm!: FormGroup;
  errorHint: boolean = false;
  subscription!: Subscription
  
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.initializeForm();
    this.route.queryParams.subscribe((params:Params)=> {
      if(params['accessDenied']){
        console.log(`Для доступа необходимо авторизоваться`);
      }
    })


  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void{
    this.authForm = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      pass: [null, [Validators.required]]
    })
  }
  

  submit(){
    let login = this.authForm.controls['login'].value;
    let pass = this.authForm.controls['pass'].value;


    this.subscription = this.auth.getAuth(login, pass).subscribe(res => {
      if(res.error.code !== 0){
        this.authForm.controls['login'].setValue(null);
        this.authForm.controls['pass'].setValue(null);
        let result = `${JSON.stringify({"error": res.error})}`
        localStorage.setItem('error_NA',`${result}`);
        localStorage.removeItem('currentUser_NA');
        this.errorHint = true;
      }else{
        localStorage.removeItem('error_NA');
        this.router.navigate(['/main']);
      }
    })
   
  }
}
