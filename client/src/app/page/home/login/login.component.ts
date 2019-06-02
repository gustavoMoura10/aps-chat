import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
/**
 * Componente da tela de login
 */
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    /**
     * Atributo que cria um formulario
     */
    loginForm: FormGroup;
    /**
     * Atributo da classe modelo
     */
    private user: User;
    /**
     * Atributo para manipulação da DOM
     */
    @ViewChild('email') emailInput: ElementRef<HTMLInputElement>;
    /**
     * Método contrutor que traz os serviços de
     * criar um formulário, de autenticação, de verificação
     * de plataforma e de rotas
     */
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private platformService: PlatformService,
        private router: Router
    ) { }

    /**
     * Método de login
     */
    signIn() {
        this.user = new User();
        this.user.email = this.loginForm.get('email').value;
        this.user.password = this.loginForm.get('password').value;
        this.authService.authenticate(this.user).subscribe(
            result => {

            },
            error => {
                console.log(error)
                this.loginForm.reset();
                if (this.platformService.isPlatformBrowser()) {
                    this.emailInput.nativeElement.focus();
                }
                this.user = undefined;
                alert('Invalid Email or Password');
            }
        )
    }
    /**
     * Método de incialização do componente
     */
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

}