import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { IUser } from 'src/app/shared/models/user.model';
import { UserService } from '../../user.service';

@Component({
  templateUrl: './user-delete-dialog.component.html',
})
export class UserDeleteDialogComponent {
  user?: IUser;

  constructor(
    protected userService: UserService,
    public activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.userService.delete(id).subscribe(() => {
      EventBus.getInstance().dispatch<any>('userListModification');
      this.activeModal.close();
    });
  }
}
