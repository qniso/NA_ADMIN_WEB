import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { TokenInterceptor } from 'src/app/shared/services/token.interceptor';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loader$ = this.load.loading$;
  authForm!: FormGroup;
  errorHint: boolean = false;
  subscription!: Subscription;
  showSpinner: boolean = false;

  constructor(
    private contentService: ContentService,
    private load: LoadingService,
    private userService: UsersService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        console.log(`Для доступа необходимо авторизоваться`);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.authForm = this.fb.group({
      login: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      pass: [null, [Validators.required]],
    });
  }

  submit() {
    let login = this.authForm.controls['login'].value;
    let pass = this.authForm.controls['pass'].value;
    this.subscription = this.auth
      .getAuth(login, pass)
      .pipe(
        tap(() => (this.showSpinner = true)),
        switchMap((auth) =>
          this.contentService.getRoleButtons().pipe(
            tap((data) => console.log(auth, data)),
            map((roles) => [auth, roles])
          )
        )
      )
      .subscribe(([auth, roles]) => {
        if (auth.error.code === 0) this.handleError(auth); // handle error

        this.userService.userRoles$$.next(roles);
        this.userService.userInfo$$.next(auth);
        this.handleSuccess();
      });
  }

  private handleSuccess() {
    localStorage.removeItem('error_NA');
    this.router.navigate(['/main']);
  }

  private handleError(authData: User) {
    let result = `${JSON.stringify({ error: authData.error })}`;
    localStorage.setItem('error_NA', `${result}`);
    localStorage.removeItem('currentUser_NA');
    this.errorHint = true;
  }
}
