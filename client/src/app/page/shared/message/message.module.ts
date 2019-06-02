import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
/**
 * Módulo que irá exportar o componente
 * de mensagens
 */
@NgModule({
    declarations: [
        MessageComponent
    ],
    exports: [
        MessageComponent
    ]
})
export class MessageModule {

}