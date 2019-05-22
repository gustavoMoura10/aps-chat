import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private userService:UserService
    ) { }

  authenticate(user: User) {
    delete user.id;
    delete user.userName;
    return this.http.post<any>(
      `${this.API_URL}/signIn`,
      user,
      {observe:'response'}
    ).pipe(tap(
      result => {
        console.log(result.body)
        this.tokenService.setToken(result.body['jwt']);
        this.userService.setUser(result.body['userName']);
        console.log(this.tokenService.getToken());
        console.log(this.userService.getUser());
      },
      error => {

      }
    ));
  }
}
