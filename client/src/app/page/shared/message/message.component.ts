import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Componente de mensagens
 */
@Component({
    selector: 'ac-message',
    templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
    /**
     * Método construtor com o parametro
     * privado de rotas
     */
    constructor(private router: Router) {

    }
    /**
     * Atributos que são atribuidos por um
     * componente pai
     */
    @Input() text: string;
    @Input() alert: string;
    ngOnInit() {

    }

}