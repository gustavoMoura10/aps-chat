import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainChatService } from 'src/app/services/chat/main-chat.service.ts/main-chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Room } from 'src/app/models/room.model';
/**
 * Componente inicial do chat
 */
@Component({
    selector: 'ac-main-chat',
    styleUrls: ['./main-chat.component.css'],
    templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {
    /**
     * Atributos
     */
    userName: string;
    room: string;
    alert: string;
    message: string;
    bool: boolean;
    roomCreate: Room;
    formRoom: FormGroup;
    listRooms: Array<Room> = [];
    hasJoin: boolean;
    /**
     * Método contrutor com parametros privados para
     * ter o serviço do main
     */
    constructor(
        private mainChatService: MainChatService,
        private formBuilder: FormBuilder) {
        this.mainChatService.roomCreated().subscribe(
            result => {
                this.listRooms = result;
                console.log(this.listRooms)
            },
            error => {
                this.messageEvent('alert-danger', 'Error on Server', true);
            }

        )
    }
    /**
     * Método para ver se o usuário
     * já está numa sala ou não
     */
    changeEvent() {
        this.hasJoin = false;
    }
    /**
     * Método para o usuário sair de uma sala
     */
    leave() {
        if (this.room) {
            this.mainChatService.leave({ userName: this.userName, room: this.room });
            this.room = undefined;
            this.hasJoin = false;
        } else {
            this.messageEvent('alert-warning', 'No Room Selected', true)
        }
    }
    /**
     * Método para criar uma nova sala
     */
    createRoom() {
        this.roomCreate = new Room();
        this.roomCreate.name = this.formRoom.get('name').value;
        this.mainChatService.createRoom(this.roomCreate).subscribe(
            result => {
                this.mainChatService.emitNewRoom(result);
                this.formRoom.reset();
            },
            error => {
                this.messageEvent('alert-danger', 'Error trying to Save Room', true);
            }
        )
    }
    /**
     * Método para achar todas as sala
     */
    findAllRooms() {
        this.mainChatService.findAllRooms().subscribe(
            result => {
                this.listRooms = result;
            },
            error => {
                this.messageEvent('alert-danger', 'Error on Server', true);
            }

        )
    }
    /**
     * Método para se juntar a uma sala
     */
    joinRoom() {
        if (this.room) {

            this.mainChatService.joinRoom({ userName: this.userName, room: this.room })
            this.hasJoin = true;
        } else {
            this.messageEvent('alert-warning', 'No Room Selected', true)
        }
    }
    /**
     * Método de mensagens
     */
    messageEvent(alert, message, bool) {
        this.bool = bool;
        this.alert = alert;
        this.message = message;
        setTimeout(() => {
            this.bool = !bool;
            this.alert = undefined;
            this.message = undefined;
        }, 5000)
    }
    /**
     * Método ao iniciar o componente
     */
    ngOnInit() {
        this.findAllRooms();
        this.userName = this.mainChatService.getUser();
        this.formRoom = this.formBuilder.group({
            name
        })
    }
}