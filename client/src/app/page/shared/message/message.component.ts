import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ac-message',
    templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
    constructor(private router: Router) {

    }
    @Input() text: string;
    @Input() alert: string;
    ngOnInit() {

    }

}