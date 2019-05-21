import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformService } from 'src/app/core/platform/platform.service';
import { User } from 'src/app/models/user.model';
@Component({
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SigninComponent implements OnInit {
    loginForm: FormGroup;
    private user: User;
    @ViewChild('email') emailInput: ElementRef<HTMLInputElement>;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private platformService: PlatformService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    signIn() {
        this.user = new User();
        this.user.email = this.loginForm.get('email').value;
        this.user.password = this.loginForm.get('password').value;
        this.authService.authenticate(this.user).subscribe(
            result => {
                this.user = undefined;
            },
            error => {
                this.loginForm.reset();
                if (this.platformService.isPlatformBrowser()) {
                    this.emailInput.nativeElement.focus();
                }
                this.user = undefined;
                alert('Invalid Email or Password');
            }
        )
    }

}