import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { IEventWork } from 'src/app/shared/models/event-work.model';
import { EventWorkService } from '../../event-work.service';

@Component({
  templateUrl: './event-work-delete-dialog.component.html',
})

export class EventWorkDeleteDialogComponent {
  
  eventWork?: IEventWork;

  constructor(
    protected eventWorkService: EventWorkService,
    public activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.eventWorkService.delete(id).subscribe(() => {
      EventBus.getInstance().dispatch<any>('eventWorkListModification');
      this.activeModal.close();
    });
  }
}
