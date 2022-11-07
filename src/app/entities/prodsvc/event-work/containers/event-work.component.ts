import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { IEventWork } from 'src/app/shared/models/event-work.model';
import { EventWorkService } from '../event-work.service';
import { EventWorkUpdateComponent } from '../components/event-work-update/event-work-update.component';
import { EventWorkDeleteDialogComponent } from '../components/event-work-delete-dialog/event-work-delete-dialog.component';

@Component({
  selector: 'event-work',
  templateUrl: './event-work.component.html',
  styleUrls: ['./event-work.component.scss'],
})
export class EventWorkComponent implements OnInit, OnDestroy {
  entityName = 'event-work';
  eventWorks: IEventWork[] = [];
  eventSubscriber?: Subscription;

  isLoading = true;

  constructor(
    private eventWorkService: EventWorkService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTable$();
    this.registerChangeInCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
    }
  }

  registerChangeInCategories(): void {
    EventBus.getInstance().register('eventWorkListModification', () => {
      this.loadTable$();
    });
  }

  loadTable$(): void {
    this.isLoading = true;
    this.eventWorkService
      .query()
      .subscribe((res: HttpResponse<IEventWork[]>) => {
        this.isLoading = false;
        this.eventWorks = res.body || [];
      });
  }

  create(): void {
    this.modalService.open(EventWorkUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  update(eventWork: IEventWork): void {
    const modalRef = this.modalService.open(EventWorkUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.eventWork = eventWork;
  }

  delete(eventWork: IEventWork): void {
    const modalRef = this.modalService.open(EventWorkDeleteDialogComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.eventWork = eventWork;
  }
}
