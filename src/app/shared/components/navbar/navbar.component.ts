import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserButtons } from '../../models/rights.model';
import { Roles } from '../../models/roles.model';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  ROLES = Roles;

  constructor(private router: Router, private userService: UsersService) {}

  userRoles = this.userService.userRoles$$;
  userButtons!: Array<UserButtons>;

  ngOnInit(): void {
    this.getButtons();
  }

  logout(): void {
    localStorage.removeItem('currentUser_NA');
    sessionStorage.removeItem('role');
    this.router.navigate(['login']);
  }

  getButtons(): void {
    this.userRoles
      .pipe(
        map((userButtonsInfo) => {
          if (!userButtonsInfo) return;
          this.userButtons = userButtonsInfo.buttons;
          // console.log(this.userButtons);
        })
      )
      .subscribe();
  }
}
