import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MessageSendService } from 'src/app/services/chat/message-send/message-send.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'ac-message-send',
    templateUrl: './message-send.component.html',
    styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnChanges {
    messageSend: string;
    alert: string;
    message: string;
    bool: boolean;
    @Input() userName: string;
    @Input() room: string;
    @Output()
    newMessage: EventEmitter<any> = new EventEmitter<any>();
    constructor(private messageSendService: MessageSendService) {

    }

    messager() {
        if (this.message && this.message !== '' && this.room) {
            this.messageSendService.message({ userName: this.userName, room: this.room, message: this.message })

        } else {
            this.messageEvent('alert-warning', 'No Room Selected', true)
        }
    }

    messageEvent(alert, message, bool) {
        this.bool = bool;
        this.alert = alert;
        this.message = message;
        setTimeout(() => {
            this.bool = !bool;
            this.alert = undefined;
            this.message = undefined;
        }, 5000)
    }

    ngOnChanges() {

    }
}