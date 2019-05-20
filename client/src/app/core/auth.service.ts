import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'localhost:3000';

  constructor(private http:HttpClient) { }
  
  authenticate(user:User){
    delete user.id;
    delete user.userName;
    return this.http.post(`${this.API_URL}/sinin`,user);
  }
}
