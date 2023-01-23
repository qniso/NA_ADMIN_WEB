import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserButtons } from 'src/app/shared/models/rights.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loader$ = this.load.loading$;
  userName: string | undefined;
  constructor(
    private load: LoadingService,
    private router: Router,
    private auth: AuthService,
    private userService: UsersService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('role'));
    this.getUserInfo();
    this.checkCurrentUser();
    this.auth.getRefreshToken().subscribe();
  }

  checkCurrentUser(): void {
    this.userService.userInfo$.subscribe((userInfo) => {
      if (!userInfo) return;
      const token = userInfo.accessToken;

      if (token) this.auth.setToken(token);
      this.router.navigate(['/login']);
    });
  }
  getUserInfo(): void {
    this.userService.getUserProfile().subscribe((res) => {
      this.userName = res.fio;
      console.log(res);

      console.log(this.userName);
    });
  }
}
