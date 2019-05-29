import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContentService } from 'src/app/services/chat/content/content.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'ac-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnChanges {
    @Input() userName: string;
    @Input() room: string;
    @Input() hasJoin: boolean
    messageArray: Array<{ user: string, message: string, archive: boolean }> = [];
    constructor(private contentService: ContentService) {
        this.contentService.newUserJoined().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
        this.contentService.userLeftRoom().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
        this.contentService.newMessage().subscribe(
            result => {
                this.messageArray.push(result)
            }
        )
    }
    ngOnChanges() {
        if (!this.hasJoin) {
            this.messageArray = [];
        }
    }
}