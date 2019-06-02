import { Injectable } from '@angular/core';
/**
 * Serviço para apenas dizer qual a URL do servidor
 */
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