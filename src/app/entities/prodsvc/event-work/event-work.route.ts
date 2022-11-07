import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve,
         ActivatedRouteSnapshot,
         Routes,
         Router, 
         RouterStateSnapshot} from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap as flatMap } from 'rxjs/internal/operators/mergeMap';

import { EventWork, IEventWork } from 'src/app/shared/models/event-work.model';
import { EventWorkService } from './event-work.service';
import { EventWorkComponent } from './containers/event-work.component';
import { EventWorkUpdateComponent } from './components/event-work-update/event-work-update.component';

@Injectable({ providedIn: 'root' })

export class EventWorkResolve implements Resolve<IEventWork> {
  constructor(
    private eventWorkService: EventWorkService,
    private router: Router
  ) {}


  resolve( route: ActivatedRouteSnapshot ): Observable<IEventWork> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.eventWorkService.find(id).pipe(
        flatMap((eventWork: HttpResponse<EventWork>) => {
          if (eventWork.body) {
            return of(eventWork.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EventWork());
  }
}

export const eventWorkRoute: Routes = [
  { path: '', component: EventWorkComponent, data: { pageTitle: 'Event Work', reloadPage: 'eventWorkListModification' } },
  { path: 'new', component: EventWorkUpdateComponent, resolve: { eventWork: EventWorkResolve, }, data: { pageTitle: 'Event Work', }, },
  { path: ':id/edit', component: EventWorkUpdateComponent, resolve: { eventWork: EventWorkResolve, }, data: { pageTitle: 'Event Work', } }
];