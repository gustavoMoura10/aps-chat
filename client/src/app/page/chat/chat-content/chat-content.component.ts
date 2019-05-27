import { Injectable, Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Room } from 'src/app/models/room.data';
import { ChatContentService } from 'src/app/services/chat/chat-content/chat-content.service';

@Component({
    selector:'chat-content',
    templateUrl:'./chat-content.component.html',
    styleUrls:['./chat-content.component.css']
})
export class ChatContentComponent implements OnChanges{
    @Input() userName:string;
    @Input() room:Room;

    constructor(private chatContentService:ChatContentService){}

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.room = changes.room.currentValue
        if(this.room){
            this.chatContentService.join({userName:this.userName,room:this.room.name})
        }
      }
}