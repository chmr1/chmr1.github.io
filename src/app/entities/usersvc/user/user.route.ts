import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Routes,
  Router,
} from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap as flatMap } from 'rxjs/internal/operators/mergeMap';

import { IUser, User } from 'src/app/shared/models/user.model';
import { UserService } from './user.service';
import { UserComponent } from './containers/user.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

@Injectable({ providedIn: 'root' })
export class UserResolve {
  //export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService, private router: Router) {}
  /*
  resolve( route: ActivatedRouteSnapshot ): Observable<IUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.userService.find(id).pipe(
        flatMap((user: HttpResponse<IUser>) => {
          if (user.body) {
            return of(user.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new User());
  }*/
}

export const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { pageTitle: 'User', reloadPage: 'userListModification' },
  },
  //{ path: 'new', component: UserUpdateComponent, data: { pageTitle: 'User' }, resolve: { user: UserResolve, } },
  //{ path: ':id/edit', component: UserUpdateComponent, data: { pageTitle: 'User' }, resolve: { user: UserResolve, } }
];
