import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from './services/auth/auth.service';
=======
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){

  }
  ngOnInit(){
    this.authService.validateToken();
  }
=======
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d
}
