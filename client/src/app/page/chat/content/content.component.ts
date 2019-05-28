import { Component } from '@angular/core';
import { ContentService } from 'src/app/services/chat/content/content.service';

@Component({
    selector: 'ac-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent {
    messageArray:Array<{user:string,message:string}> = [];
    constructor(private contentService:ContentService){
        this.contentService.newUserJoined().subscribe(
            result =>{
                this.messageArray.push(result)
            }
        )
    }
}