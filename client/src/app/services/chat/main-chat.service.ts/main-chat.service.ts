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
        private http:HttpClient,
        private urlService:UrlService
        ) {
    }
    onRoomCreated(){
        this.socket.on('roomCreated',data =>{
            
        })
    }
    emitNewRoom(data){
        this.socket.emit('newRoom',data)
    }
    createRoom(room:Room){
        delete room.id;
        return this.http.post<Room>(`${this.urlService.getUrlApi()}/room`,room);
    }
    joinRoom(data) {
        this.socket.emit('join', data);
    }

    getUser() {
        return this.authService.getUser();
    }

}