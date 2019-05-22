import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenService } from '../token/token.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private token: TokenService, private urlService: UrlService) { }
    authenticate(user: User) {
        delete user.id
        return this.http.post(`${this.urlService.getUrlApi()}/signIn`,
            user
            ,
            { observe: 'response' }
        ).pipe(tap(
            result => {
                this.token.setToken(result.body['jwt']);
                this.http.get(`${this.urlService.getUrlApi()}/api/teste`).subscribe(r => { console.log(r) })
            }
        ))
    }
}