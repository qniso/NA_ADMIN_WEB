import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ContentService } from '../services/content.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot): boolean {
    this.userService.userRoles$$
      .pipe(
        map((permissions) => {
          const userRole = permissions.role;
          const expectedRoles = route.data['roles'];
          if (
            route.data['roles'] &&
            route.data['roles'].indexOf(userRole) === -1
          ) {
            this.router.navigate(['/']);
          }
        })
      )
      .subscribe();

    return true;
  }
}
