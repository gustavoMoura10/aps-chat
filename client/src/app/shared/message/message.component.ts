import { Component, Input } from '@angular/core';

@Component({
    selector:'ac-message',
    templateUrl:'./message.component.html'
})
export class MessageComponent{
    @Input() text:string;
    @Input() alert:string;
}