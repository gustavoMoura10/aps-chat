import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    constructor(private socket:Socket) { }

    test(){
        this.socket.emit('teste','teste')
    }

}