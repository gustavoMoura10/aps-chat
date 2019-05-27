import { NgModule } from '@angular/core';
import { MainChatComponent } from './main-chat/main-chat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/auth/token.interceptor';
import { MessageSendComponent } from './message/message-send.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatContentComponent } from './chat-content/chat-content.component';

@NgModule({
    declarations: [
        MainChatComponent,
        MessageSendComponent,
        ChatContentComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    exports:[
        MessageSendComponent,
        ChatContentComponent
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ]
})
export class ChatModule {

}