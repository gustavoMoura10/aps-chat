import { NgModule } from '@angular/core';
import { MainChatComponent } from './main-chat/main-chat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/auth/token.interceptor';
import { MessageSendComponent } from './message-send/message-send.component';
import { ContentComponent } from './content/content.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from '../shared/message/message.module';

@NgModule({
    declarations: [
        MainChatComponent,
        MessageSendComponent,
        ContentComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AngularFontAwesomeModule,
        MessageModule,
        ReactiveFormsModule
    ],
    exports: [
        MainChatComponent
    ],


})
export class ChatModule {

}