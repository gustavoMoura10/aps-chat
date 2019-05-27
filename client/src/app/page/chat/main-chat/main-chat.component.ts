import { Component, OnInit } from '@angular/core';
import { MainChatService } from 'src/app/services/chat/main-chat.service.ts/main-chat.service';

@Component({
    selector: 'ac-main-chat',
    styleUrls: ['./main-chat.component.css'],
    templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {
    userName: string;
    room: string;
    constructor(private mainChatService: MainChatService) { }
    joinRoom() {
        this.mainChatService.joinRoom({ userName: this.userName, room: this.room })
    }
    ngOnInit() {
        this.userName = this.mainChatService.getUser();
    }
}