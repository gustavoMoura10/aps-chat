import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MessageModule } from 'src/app/page/shared/message/message.module';
import { MainComponent } from './main/main.component';
@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
        RegisterComponent,
        MainComponent
    ],
    imports: [
        ReactiveFormsModule,
        MessageModule,
        CommonModule,
        FormsModule
    ]
})
export class HomeModule {

}