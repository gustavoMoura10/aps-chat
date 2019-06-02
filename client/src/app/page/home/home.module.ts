import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MessageModule } from 'src/app/page/shared/message/message.module';
import { MainComponent } from './main/main.component';
/**
 * Módulo home que traz os componentes 
 * de registro, tela inicial e de login
 */
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