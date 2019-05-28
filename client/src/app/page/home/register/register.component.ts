import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { PlatformService } from 'src/app/services/platform/platform.service';
import { RegisterService } from 'src/app/services/home/register/register.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup
    user: User;
    alert: string;
    message: string;
    bool: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private platFormService: PlatformService,
        private registerService: RegisterService,
        private router: Router
    ) { }

    register() {
        this.user = new User();
        this.user.email = this.registerForm.get('email').value;
        this.user.password = this.registerForm.get('password').value;
        this.user.userName = this.registerForm.get('userName').value;
        this.user['confirmPassword'] = this.registerForm.get('confirmPassword').value;
        this.registerService.register(this.user).subscribe(
            result => {
                this.router.navigate(['login'])
            },
            error => {
                this.messageEvent('alert-danger', 'Error on Server', true);
            }
        )
    }
    messageEvent(alert, message, bool) {
        this.bool = bool;
        this.alert = alert;
        this.message = message;
        setTimeout(() => {
            this.bool = !bool;
            this.alert = undefined;
            this.message = undefined;
        }, 5000)
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        })
    }
}