import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private load: LoadingService,
    private router: Router,
    private auth: AuthService,
    private userService: UsersService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('role'));

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

    // if (token || token !== null) {
    //   this.auth.setToken(token);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
