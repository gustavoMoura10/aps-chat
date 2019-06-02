import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

/**
 * Componente de navegação
 */
@Component({
    selector: 'ac-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    /**
     * Método construtor que usa atributos
     * privados de rotas e autenticação
    */
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }
    /**
     * Verifica se o usuário está logado
     */
    isLogged() {
        return this.authService.getUser();
    }
    /**
     * Caso não ele desloga
     */
    logout() {
        this.authService.deleteStorages();
        this.router.navigate(['login'])
    }
    /**
     * Traz o nome do usuário
     */
    getUser() {
        return this.authService.getUser();
    }

}