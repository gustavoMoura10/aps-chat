import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authenticate(user: User) {
    delete user.id;
    delete user.userName;
    return this.http.post(`${this.API_URL}/signIn`, user).pipe(tap(
      result => {
        console.log(result)
      },
      error => {

      }
    ));
  }
}
