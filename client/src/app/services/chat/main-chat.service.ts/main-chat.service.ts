import { Injectable } from '@angular/core';
import { UrlService } from '../../url/url.service';
import { AuthService } from '../../auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from 'src/app/models/room.model';
/**
 * Serviço principal do chat
 */
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
    /**
     * Método ao criar uma nova sala
     */
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
    /**
     * Método caso o usuário abandone a sala
     */
    leave(data) {
        this.socket.emit('leave', data)
    }
    /**
     * Método para achar todas as salas
     */
    findAllRooms() {
        return this.http.get<Array<Room>>(`${this.urlService.getUrlApi()}/api/room`);
    }
    /**
     * Informar a criação de uma nova sala
     */
    emitNewRoom(data) {
        this.socket.emit('newRoom', data)
    }
    /**
     * Enviar para os usuários a sala criada
     */
    createRoom(room: Room) {
        delete room.id;
        return this.http.post<Room>(`${this.urlService.getUrlApi()}/api/room`, room);
    }
    /**
     * Método para se juntar a uma sala
     */
    joinRoom(data) {
        this.socket.emit('join', data);
    }
    /**
     * Método para pegar o nome do usuário
     */
    getUser() {
        return this.authService.getUser();
    }

}