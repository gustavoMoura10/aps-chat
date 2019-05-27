import { Component, Input } from '@angular/core';

@Component({
    selector:'message-send',
    templateUrl:'./message-send.component.html',
    styleUrls:['./message-send.component.css']
})
export class MessageSendComponent{
    @Input() userName:string;
    message:string;
}