import { NgModule } from '@angular/core';
import { MainChatComponent } from './main-chat/main-chat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/auth/token.interceptor';

@NgModule({
    declarations: [
        MainChatComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],

})
export class ChatModule {

}