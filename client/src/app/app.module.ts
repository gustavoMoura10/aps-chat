import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './page/home/home.module';
import { TemplateModule } from './template/template.module';
import { CommonModule } from '@angular/common';
import { ChatModule } from './page/chat/chat.module';
import { TokenInterceptor } from './services/auth/token.interceptor';
<<<<<<< HEAD
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {path:'/chat'} };
=======
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    TemplateModule,
    HttpClientModule,
    CommonModule,
    ChatModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }