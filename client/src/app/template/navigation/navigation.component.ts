import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ac-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }
    isLogged() {
        return this.authService.getUser();
    }
    logout() {
        this.authService.deleteStorages();
        this.router.navigate(['login'])
    }
    getUser() {
        return this.authService.getUser();
    }

}