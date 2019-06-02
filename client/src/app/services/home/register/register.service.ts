import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../url/url.service';
import { tap } from 'rxjs/operators';

/**
 * Serviço para registrar um novo usuário
 */
@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private httpClient: HttpClient, private urlService: UrlService) { }
    register(user: User) {
        delete user.id;
        return this.httpClient.post(`${this.urlService.getUrlApi()}/register`, user).pipe(tap(
            result => {
                console.log(result)
            },
            error => {
                console.log(error)
            }
        ))
    }
}