import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { bloomHasToken } from '@angular/core/src/render3/di';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private authorization = 'Authorization'

    hasToken() {
        return !!this.getToken();
    }
    setToken(value) {
        let header = new HttpHeaders();
        header.set(this.authorization, value);
    }
    getToken() {
        let header = new HttpHeaders();
        return header.get(this.authorization);
    }
    deleteToken() {
        let header = new HttpHeaders();
        header.delete(this.authorization);
    }
}