import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { IEventType } from 'src/app/shared/models/event-type.model';
import { EventTypeService } from '../../event-type.service';

@Component({
  templateUrl: './event-type-delete-dialog.component.html',
})

export class EventTypeDeleteDialogComponent {

  eventType?: IEventType;

  constructor(
    protected eventTypeService: EventTypeService,
    public activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.eventTypeService.delete(id).subscribe(() => {
      EventBus.getInstance().dispatch<any>('userListModification');
      this.activeModal.close();
    });
  }
}