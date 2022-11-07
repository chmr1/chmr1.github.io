import { Injectable } from '@angular/core';
import { EventWork } from '../interfaces/eventWork';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  
  //apiUrl: string = "https://635182043e9fa1244e608313.mockapi.io/crudcomplete/eventos";
  apiUrl: string = "https://agenda-topdown.herokuapp.com/eventsWork"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor( private httpClient: HttpClient) { }

  getEventos(): Observable< EventWork[]  > {
    return this.httpClient.get< EventWork[] >( `${this.apiUrl}` );
  }

  getEvento( id: string ): Observable< EventWork > {
    return this.httpClient.get< EventWork >( `${this.apiUrl}/${id}` );
  }

  deleteEvento( id: string ): Observable< EventWork >  {
    return this.httpClient.delete< EventWork >( `${this.apiUrl}/${id}` );
  }

  createEvento( evento: EventWork ): Observable< EventWork > {
    return this.httpClient.post< EventWork >( `${this.apiUrl}` , evento , this.httpOptions );
  }

  updateEvento( evento: EventWork ): Observable< EventWork > {
    return this.httpClient.put< EventWork >( `${this.apiUrl}/${evento.id}` , evento , this.httpOptions );
  }
  
}
