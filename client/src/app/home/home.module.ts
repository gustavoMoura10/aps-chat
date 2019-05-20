import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/singin.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MessageComponent } from '../shared/message/message.component';
import { MessageModule } from '../shared/message/message.module';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:[
        SigninComponent
    ],
    imports:[
        ReactiveFormsModule,
        MessageModule,
        CommonModule
    ]
})
export class HomeModule{
    
}