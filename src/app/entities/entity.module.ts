import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'event-work',
        loadChildren: () =>
          import('./prodsvc/event-work/event-work.module').then(
            (m) => m.EventWorkModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./usersvc/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'event-type',
        loadChildren: () =>
          import('./prodsvc/event-type/event-type.module').then(
            (m) => m.EventTypeModule
          ),
      },
    ]),
  ],
})
export class EntityModule {}
