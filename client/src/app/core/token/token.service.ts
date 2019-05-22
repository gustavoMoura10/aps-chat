import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TOKENNAME = 'Authorization'
  constructor(
    private http:HttpClient
  ) { }

  hasToken(){
    return !!this.getToken();
  }
  setToken(value){
    window.localStorage.setItem(this.TOKENNAME,`Bearer ${value}`);
  }
  getToken(){
    return window.localStorage.getItem(this.TOKENNAME);
  }
  removeToken(){
    window.localStorage.removeItem(this.TOKENNAME);
  }
}
