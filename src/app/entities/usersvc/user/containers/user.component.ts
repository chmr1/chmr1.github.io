import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { IUser } from 'src/app/shared/models/user.model';
import { UserService } from '../user.service';
import { UserUpdateComponent } from '../components/user-update/user-update.component';
import { UserDeleteDialogComponent } from '../components/user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  entityName = 'user';
  users: IUser[] = [];
  eventSubscriber?: Subscription;

  isLoading = true;

  constructor(
    private userService: UserService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTable$();
    this.registerChangeInCategories();
  }

  registerChangeInCategories(): void {
    EventBus.getInstance().register('userListModification', () => {
      this.loadTable$();
    });
  }

  loadTable$(): void {
    this.isLoading = true;
    this.userService.query().subscribe((res: HttpResponse<IUser[]>) => {
      this.isLoading = false;
      this.users = res.body || [];
    });
  }

  create(): void {
    this.modalService.open(UserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  update(user: IUser): void {
    const modalRef = this.modalService.open(UserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.user = user;
  }

  delete(user: IUser): void {
    const modalRef = this.modalService.open(UserDeleteDialogComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.user = user;
  }
}
