import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private urlService: UrlService, private router: Router) { }
    authenticate(user: User) {
        delete user.id
        return this.http.post(`${this.urlService.getUrlApi()}/signIn`, user,
            { observe: 'response' }
        ).pipe(tap(
            result => {
                localStorage.setItem('auth', `${result.body['jwt']}`);
                localStorage.setItem('userName', result.body['userName']);
                this.router.navigate(['user', this.getUser()])
                this.http.get(`${this.urlService.getUrlApi()}/api/teste`).subscribe(
                    result => {
                        console.log(result)
                    },
                    error => {

                    }
                )
            }
        ))
    }
    getToken() {
        return localStorage.getItem('auth');
    }
    getUser() {
        return localStorage.getItem('userName');
    }
    deleteStorages() {
        localStorage.clear();
    }
    hasToken() {
        return !!this.getToken();
    }
}