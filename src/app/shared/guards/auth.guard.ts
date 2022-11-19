import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

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
        this.router.navigate(['login']);
        return false;
    }
    
}