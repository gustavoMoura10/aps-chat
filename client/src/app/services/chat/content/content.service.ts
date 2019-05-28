import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    constructor(private authService: AuthService, private socket: Socket) {
    }

    newUserJoined() {
        let observable = new Observable<{ user: string, message: string }>(
            observer => {
                this.socket.on('newUserJoined', (data) => {
                    observer.next(data);
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }
    userLeftRoom() {
        let observable = new Observable<{ user: string, message: string }>(
            observer => {
                this.socket.on('userLeft', (data) => {
                    observer.next(data);
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }

    newMessage() {
        let observable = new Observable<{ user: string, message: string }>(
            observer => {
                this.socket.on('newMessage', (data) => {
                    console.log(data)
                    observer.next(data);
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }

}