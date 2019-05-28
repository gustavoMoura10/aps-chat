import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageSendService {
    constructor(private socket: Socket) {

    }

    message(data) {
        this.socket.emit('message', data);
    }


}