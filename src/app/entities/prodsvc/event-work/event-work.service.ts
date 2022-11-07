import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from 'src/app/core/config';
import { IEventWork } from 'src/app/shared/models/event-work.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IEventWork>;
type EntityArrayResponseType = HttpResponse<IEventWork[]>;

@Injectable({ providedIn: 'root' })
export class EventWorkService {
  private readonly API_URL = `${config['apiUrl']}/event-work`;

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventWork[]>(`${this.API_URL}/`, {
      params: options,
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEventWork>(`${this.API_URL}/${id}`, {
      observe: 'response',
    });
  }

  create(eventWork: IEventWork): Observable<EntityResponseType> {
    return this.http.post<IEventWork>(`${this.API_URL}/`, eventWork, {
      observe: 'response',
    });
  }

  update(eventWork: IEventWork): Observable<EntityResponseType> {
    return this.http.put<IEventWork>(
      `${this.API_URL}/${eventWork.id}`,
      eventWork,
      { observe: 'response' }
    );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.API_URL}/${id}`, { observe: 'response' });
  }
}
