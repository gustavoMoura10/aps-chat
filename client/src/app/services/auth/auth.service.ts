import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private urlService: UrlService) { }
    authenticate(user: User) {
        delete user.id
        return this.http.post(`${this.urlService.getUrlApi()}/signIn`, user,
            { observe: 'response' }
        ).pipe(tap(
            result => {
                localStorage.setItem('auth',result.body['jwt']);
                localStorage.setItem('userName',result.body['userName'])
            }
        ))
    }
}