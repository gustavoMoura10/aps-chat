import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './page/home/home.module';
import { TemplateModule } from './template/template.module';
import { CommonModule } from '@angular/common';
import { ChatModule } from './page/chat/chat.module';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
/**
 * URL para o socke.io
 */
const config: SocketIoConfig = { url: 'localhost:3000', options: {} };
/**
 * Módulo principal da aplicação com suas
 * importações de módulos próprios do Angular
 * que ajudam no desenvolvimento como também
 * módulos próprios. Também há os interceptadores
 * que servem como serviços para manter o token
 * no header
 */
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