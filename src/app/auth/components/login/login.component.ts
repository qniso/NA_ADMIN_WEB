import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      console.log(res);
      console.log(res.error.code);
      
      if(res.error.code == 402){
        this.authForm.controls['login'].setValue(null);
        this.authForm.controls['pass'].setValue(null);
        this.errorHint = true;
      }else{
        let result = `${JSON.stringify({"id": res.id, "role": res.role})}`
        localStorage.setItem('currentUser_NA',`${result}`)
        this.router.navigate(['main']);
      }
    })
  }
}
