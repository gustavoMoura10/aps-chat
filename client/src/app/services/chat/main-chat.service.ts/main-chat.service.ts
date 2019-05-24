import { Injectable } from '@angular/core';
import { UrlService } from '../../url/url.service';
import { AuthService } from '../../auth/auth.service';
import { WebSocketService } from '../websocket.service';

@Injectable({
    providedIn: 'root'
})
export class MainChatService {
    constructor(private authService: AuthService, private chatService: WebSocketService) {
    }

    userConected() {
        this.chatService.connect();
    }

}