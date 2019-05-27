import { Injectable } from '@angular/core';
import { UrlService } from '../../url/url.service';
import { AuthService } from '../../auth/auth.service';
import { WebSocketService } from '../websocket.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class MainChatService {
    constructor(private authService: AuthService, private socket: Socket) {
    }

    joinRoom(data) {
        this.socket.emit('join', data);
    }

    getUser() {
        return this.authService.getUser();
    }

}