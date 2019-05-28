import { Injectable } from '@angular/core';
import { UrlService } from '../../url/url.service';
import { AuthService } from '../../auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/models/room.model';

@Injectable({
    providedIn: 'root'
})
export class MainChatService {
    constructor(
        private authService: AuthService,
        private socket: Socket,
        private http: HttpClient,
        private urlService: UrlService
    ) {
    }
    roomCreated() {
        let observable = new Observable<Array<Room>>(
            observer => {
                this.socket.on('roomCreated', (data) => {
                    this.http.get<Array<Room>>(`${this.urlService.getUrlApi()}/api/room`).subscribe(
                        result => {
                            observer.next(result);
                        },
                        error => {
                            observer.error(error);
                        }

                    )
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }
    leave(data) {
        this.socket.emit('leave', data)
    }
    findAllRooms() {
        return this.http.get<Array<Room>>(`${this.urlService.getUrlApi()}/api/room`);
    }
    emitNewRoom(data) {
        this.socket.emit('newRoom', data)
    }
    createRoom(room: Room) {
        delete room.id;
        return this.http.post<Room>(`${this.urlService.getUrlApi()}/api/room`, room);
    }
    joinRoom(data) {
        this.socket.emit('join', data);
    }

    getUser() {
        return this.authService.getUser();
    }

}