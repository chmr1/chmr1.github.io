import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { config } from 'src/app/core/config';
import { IEventType } from 'src/app/shared/models/event-type.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IEventType>;
type EntityArrayResponseType = HttpResponse<IEventType[]>;

@Injectable({ providedIn: 'root' })
export class EventTypeService {
  private readonly API_URL = `${config['apiUrl']}/event-type`;

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventType[]>(`${this.API_URL}/`, {
      params: options,
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEventType>(`${this.API_URL}/${id}`, {
      observe: 'response',
    });
  }

  create(eventType: IEventType): Observable<EntityResponseType> {
    return this.http.post<IEventType>(`${this.API_URL}/`, eventType, {
      observe: 'response',
    });
  }

  update(eventType: IEventType): Observable<EntityResponseType> {
    return this.http.put<IEventType>(
      `${this.API_URL}/${eventType.id}`,
      eventType,
      { observe: 'response' }
    );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.API_URL}/${id}`, { observe: 'response' });
  }
}
