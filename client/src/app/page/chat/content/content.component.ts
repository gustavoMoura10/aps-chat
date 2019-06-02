import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentService } from 'src/app/services/chat/content/content.service';
import { Subject } from 'rxjs';
/**
 * Componente de conteudo que será mostrado no chat
 */
@Component({
    selector: 'ac-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnChanges {
    /**
     * Atributos que serão informados por um
     * componente pai
     */
    @Input() userName: string;
    @Input() room: string;
    @Input() hasJoin: boolean
    /**
     * Array que recebe as mensagens
     */
    messageArray: Array<{ user: string, message: string, archive: boolean }> = [];
    /**
     * Método construtor que recebe informações do
     * socket.io
     */
    constructor(private contentService: ContentService) {
        this.contentService.newUserJoined().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
        this.contentService.userLeftRoom().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
        this.contentService.newMessage().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
    }
    /**
     * Método de implementação ao ter alguma
     * mudança de valor de componente
     */
    ngOnChanges() {
        if (!this.hasJoin) {
            this.messageArray = [];
        }
    }
}