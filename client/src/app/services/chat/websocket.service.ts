import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket;

    constructor() { }

    connect(): Rx.Subject<MessageEvent> {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = io('http://localhost:3000', { path: '/chat' });

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                console.log("Received message from Websocket Server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });
        let observer = {
            next: (data: Object) => {
                this.socket.emit('message', JSON.stringify(data));
            },
        };
        return Rx.Subject.create(observer, observable);
    }
    emi

}