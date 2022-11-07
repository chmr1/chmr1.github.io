import { Component, OnInit } from '@angular/core';
import { EventWork } from 'src/app/interfaces/eventWork';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: EventWork[] = [];

  constructor( private eventoService: EventoService ) { }

  ngOnInit(): void {
    this.listarEventos();
  }

  listarEventos(): void {
    this.eventoService.getEventos().subscribe( resposta => { this.eventos = resposta } );
  }

  excluirEvento( id?: any ): void {
    this.eventoService.deleteEvento( id ).subscribe( resposta => {
      console.log( "Usuario Deletado!", resposta );
      this.listarEventos();
    })
    alert("Usuário deletado com sucesso!")
  }

}
