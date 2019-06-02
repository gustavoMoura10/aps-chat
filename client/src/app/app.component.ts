import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';


/**
 * Componente principal do site
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,private router:Router) { }

  /**
   * Método que valida o token do usuário
   */
  ngOnInit() {
    this.authService.validateToken();
  }
}
