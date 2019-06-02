import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Socket } from 'ngx-socket-io';
/**
 * Serviço de conteudo
 */
@Injectable({
    providedIn: 'root'
})
export class ContentService {
    constructor(private authService: AuthService, private socket: Socket) {
    }
    /**
     * Método caso um novo usuário entre na sala
     */
    newUserJoined() {
        let observable = new Observable<{ user: string, message: string, archive: boolean }>(
            observer => {
                this.socket.on('newUserJoined', (data) => {
                    observer.next(data);
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }
    /**
     * Método caso o usuário saia da sala
     */
    userLeftRoom() {
        let observable = new Observable<{ user: string, message: string, archive: boolean }>(
            observer => {
                this.socket.on('userLeft', (data) => {
                    observer.next(data);
                })
                return () => { this.socket.disconnect() }
            }
        )
        return observable;
    }
    /**
     * Método caso o usuário envie uma nova mensagem
     */
    newMessage() {
        let observable = new Observable<{ user: string, message: string, archive: boolean }>(
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