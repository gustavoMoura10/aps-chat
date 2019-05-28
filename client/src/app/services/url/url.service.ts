import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    private URLAPI = 'http://192.1.6.43:3000'
    constructor(
    ) { }

    getUrlApi() {
        return this.URLAPI;
    }
}