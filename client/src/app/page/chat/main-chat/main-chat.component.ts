import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainChatService } from 'src/app/services/chat/main-chat.service.ts/main-chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Room } from 'src/app/models/room.data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatContentComponent } from '../chat-content/chat-content.component';

@Component({
    selector: 'ac-main-chat',
    styleUrls: ['./main-chat.component.css'],
    templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {
<<<<<<< HEAD
    userName: string
    room: Room;
    roomForm: FormGroup
    roomsList: Array<Room>
    roomSelected:Room;
    constructor(
        private mainChatService: MainChatService,
        private formBuilder: FormBuilder
    ) { }
    createRoom() {
        this.room = new Room();
        this.room.name = this.roomForm.get('name').value;
        this.mainChatService.createNewRoom(this.room).subscribe(
            result => {
                this.roomForm.get('name').reset()
                this.getRooms();
            },
            error => {
                console.log(error)
            }
        )
    }
    getRooms() {
        console.log('Passei')
        this.mainChatService.getRooms().subscribe(
            resultRooms => {
                this.roomsList = resultRooms;
                console.log(this.roomsList)
            },
            error => {
                console.log(error)
            }
        )
    }
    ngOnInit() {
        this.userName = this.mainChatService.getUserName();
        this.roomForm = this.formBuilder.group({
            name
        })
        this.getRooms();
=======
    userName: string;
    room: string;
    constructor(private mainChatService: MainChatService) { }
    joinRoom() {
        this.mainChatService.joinRoom({ userName: this.userName, room: this.room })
    }
    ngOnInit() {
        this.userName = this.mainChatService.getUser();
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d
    }
}