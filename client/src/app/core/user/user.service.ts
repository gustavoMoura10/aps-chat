import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setUser(value){
    window.localStorage.setItem('userName',value);
  }
  getUser(){
    return window.localStorage.getItem('userName')
  }
}
