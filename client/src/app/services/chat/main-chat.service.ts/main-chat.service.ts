import { Injectable } from '@angular/core';
import { UrlService } from '../../url/url.service';
import * as io from "socket.io-client";
import { AuthService } from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MainChatService {
    /* private socket = io(this.urlService.getUrlApi()); */

    constructor(private urlService: UrlService, private authService: AuthService, ) {
        /* this.socket = io(this.urlService.getUrlApi(), {
            path: '/api/chat',
            query: {
                token: "Bearer " + this.authService.getToken()
            }
        }) */
    }

    userConected() {

    }

}