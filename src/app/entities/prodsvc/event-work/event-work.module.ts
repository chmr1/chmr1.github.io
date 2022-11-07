import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { EventWorkComponent } from './containers/event-work.component';
import { EventWorkUpdateComponent } from './components/event-work-update/event-work-update.component';
import { EventWorkDeleteDialogComponent } from './components/event-work-delete-dialog/event-work-delete-dialog.component';
import { eventWorkRoute } from './event-work.route';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(eventWorkRoute),
  ],
  declarations: [
    EventWorkComponent,
    EventWorkUpdateComponent,
    EventWorkDeleteDialogComponent,
  ],
  entryComponents: [EventWorkDeleteDialogComponent],
})
export class EventWorkModule {}