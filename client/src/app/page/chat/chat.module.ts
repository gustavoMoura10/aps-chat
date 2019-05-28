import { NgModule } from '@angular/core';
import { MainChatComponent } from './main-chat/main-chat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/auth/token.interceptor';
<<<<<<< HEAD
import { MessageSendComponent } from './message/message-send.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatContentComponent } from './chat-content/chat-content.component';
=======
import { MessageSendComponent } from './message-send/message-send.component';
import { ContentComponent } from './content/content.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d

@NgModule({
    declarations: [
        MainChatComponent,
        MessageSendComponent,
<<<<<<< HEAD
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
=======
        ContentComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AngularFontAwesomeModule
    ],
    exports: [
        MainChatComponent
    ],


>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d
})
export class ChatModule {

}