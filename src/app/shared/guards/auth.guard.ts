import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TokenInterceptor } from "../services/token.interceptor";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(
        private authServise: AuthService,
        private router: Router
    ){

    }
    //route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    canActivate(){

        if(this.authServise.isLogined()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    
}