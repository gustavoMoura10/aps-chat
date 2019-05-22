import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformService } from 'src/app/core/platform/platform.service';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/core/regiter/register.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    newUser:User;

    constructor(
        private formBuilder: FormBuilder,
        private platFormService:PlatformService,
        private registerService:RegisterService
    ) { }

    register(){
        this.newUser = new User();
        this.newUser.email = this.registerForm.get('email').value;
        this.newUser.password = this.registerForm.get('password').value;
        this.newUser.userName = this.registerForm.get('userName').value;
        this.newUser['confirmPassword'] = this.registerForm.get('confirmPassword').value;
        this.registerService.regiterUser(this.newUser).subscribe(
            result =>{
                console.log(result);
            },
            error =>{
                console.log(error)
            }
        )
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email:['',[Validators.required,Validators.email]],
            userName:['',[Validators.required]],
            password:['',[Validators.required]],
            confirmPassword:['',[Validators.required]]
        });
    }
}