import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../../models/user.model';
import { AuthService } from 'src/app/core/auth.service';
@Component({
    templateUrl: './signin.component.html',

})
export class SigninComponent implements OnInit {
    loginForm:FormGroup;
    private user:User;
    @ViewChild('email') emailInput:ElementRef<HTMLInputElement>;
    constructor(private formBuilder:FormBuilder,
        private authService:AuthService){}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['',Validators.required,Validators.email],
            password:['',Validators.required]
        });
    }
    SignIn(){
        this.user.email = this.loginForm.get('email').value;
        this.user.password = this.loginForm.get('password').value;
        this.authService.authenticate(this.user).subscribe(
            result =>{
                console.log('Logado');
                this.user = undefined;
            },
            error =>{
                console.log('Deu ruim')
                this.loginForm.reset();
                this.emailInput.nativeElement.focus();
                this.user = undefined;
            }
        )
    }

}