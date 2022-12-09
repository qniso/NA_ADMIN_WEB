import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../services/content.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private contentService: ContentService,
    private router: Router
){

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }
  
  isAuthorized(route: ActivatedRouteSnapshot):boolean{
    let userRole = localStorage.getItem('role');
    const expectedRoles = route.data['roles'];

    if(route.data['roles'] && route.data['roles'].indexOf(userRole) === -1){
      console.log(route.data['roles'] );

      // this.router.navigate(['/']);
      return false;
    }
    return true;
   
  }
 
}
