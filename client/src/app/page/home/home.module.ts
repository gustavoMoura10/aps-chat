import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { MessageModule } from 'src/app/page/shared/message/message.module';
@NgModule({
    declarations: [
        SigninComponent,
        RegisterComponent
    ],
    imports: [
        ReactiveFormsModule,
        MessageModule,
        CommonModule
    ]
})
export class HomeModule {

}