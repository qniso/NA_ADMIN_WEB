import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(
        private authServise: AuthService
    ){

    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //     if(this.authServise)implements CanActivate{
    // }
    
}