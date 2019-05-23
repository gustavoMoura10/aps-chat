import { Component, OnInit } from '@angular/core';
import { MainChatService } from 'src/app/services/chat/main-chat.service.ts/main-chat.service';

@Component({
    templateUrl: './main-chat.component.html'
})
export class MainChatComponent implements OnInit {

    constructor(private chatService: MainChatService) { }

    ngOnInit() {
        /*  this.chatService.userConected(); */
    }
}