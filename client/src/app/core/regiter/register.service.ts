import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  regiterUser(user: User) {
    delete user.id;
    return this.http
      .post<User>(`${this.API_URL}/register`, user)
      .pipe(tap(
        result => {
          console.log(result);
        },
        error => {
          console.log(error)
        }
      ))
  }
}
