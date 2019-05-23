import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class FreeGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ): boolean {
        if (!this.authService.getToken()) {
            return true;
        } else {
            this.router.navigate(['user', this.authService.getUser()])
            return false;
        }
    }
}