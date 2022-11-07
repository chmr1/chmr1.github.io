import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/app/core/config';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IUser>;
type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = `${config['apiUrl']}/user`;

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(`${this.API_URL}/`, {
      params: options,
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.API_URL}/${id}`, {
      observe: 'response',
    });
  }

  create(eventWork: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(`${this.API_URL}/`, eventWork, {
      observe: 'response',
    });
  }

  update(eventWork: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(`${this.API_URL}/${eventWork.id}`, eventWork, {
      observe: 'response',
    });
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.API_URL}/${id}`, { observe: 'response' });
  }
}
