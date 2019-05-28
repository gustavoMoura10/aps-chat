import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainChatService } from 'src/app/services/chat/main-chat.service.ts/main-chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Room } from 'src/app/models/room.model';

@Component({
    selector: 'ac-main-chat',
    styleUrls: ['./main-chat.component.css'],
    templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {
    userName: string;
    room: string;
    alert:string;
    message:string;
    bool:boolean;
    roomCreate:Room;
    formRoom:FormGroup;
    constructor(
        private mainChatService: MainChatService,
        private formBuilder:FormBuilder) {
            
    }
    leave() {
        
    }
    createRoom(){
        this.roomCreate = new Room();
        this.mainChatService.createRoom(this.roomCreate).subscribe(
            result =>{
                this.mainChatService.emitRoomCreated(result)
            },
            error =>{
                this.messageEvent('alert-danger','Error trying to Save Room',true);
            }
        )
    }
    joinRoom() {
        if (this.room)
            this.mainChatService.joinRoom({ userName: this.userName, room: this.room })
        else
        this.messageEvent('alert-warning','No Room Selected',true)
    }
    messageEvent(alert,message,bool){
        this.bool = bool;
        this.alert = alert;
        this.message = message;
        setTimeout(()=>{
            this.bool = !bool;
            this.alert = undefined;
            this.message = undefined;
        },5000)
    }
    ngOnInit() {
        this.userName = this.mainChatService.getUser();
        this.formRoom = this.formBuilder.group({
            name
        })
    }
}