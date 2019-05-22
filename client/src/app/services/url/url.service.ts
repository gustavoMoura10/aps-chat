import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    private URLAPI = 'http://localhost:3000'
    constructor(
    ) { }

    getUrlApi() {
        return this.URLAPI;
    }
}