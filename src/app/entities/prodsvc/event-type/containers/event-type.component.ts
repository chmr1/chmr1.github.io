import { Component,  OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from "src/app/shared/services/event-bus.service";
import { IEventType } from "src/app/shared/models/event-type.model";
import { EventTypeService } from "../event-type.service";
import { EventTypeUpdateComponent } from "../components/event-type-update/event-type-update.component";
import { EventTypeDeleteDialogComponent } from "../components/event-type-delete-dialog/event-type-delete-dialog.component";


@Component({
    selector: 'event-type',
    templateUrl: './event-type.component.html',
    styleUrls: ['./event-type.component.scss'],
})

export class EventTypeComponent implements OnInit {

    entityName = 'event-type';
    eventTypes: IEventType[] = [];
    eventSubscriber?: Subscription;
    
    isLoading = true;

    constructor( private eventTypeService: EventTypeService, protected modalService: NgbModal ) {}

    ngOnInit(): void {
        this.loadTable$();
        this.registerChangeInCategories();
    }

    registerChangeInCategories(): void {
        EventBus.getInstance().register('userListModification', () => {
            this.loadTable$();
        })
    }

    loadTable$(): void {
        this.isLoading = true;
        this.eventTypeService.query().subscribe((res: HttpResponse<IEventType[]>) => {
            this.isLoading = false;
            this.eventTypes = res.body || [];
        })
    }

    create(): void {
        this.modalService.open( EventTypeUpdateComponent, {
            size: 'lg',
            backdrop: 'static',
        });
    }
    
    update(eventType: IEventType): void {
        const modalRef = this.modalService.open( EventTypeUpdateComponent, {
        size: 'lg',
        backdrop: 'static',
        });
        modalRef.componentInstance.eventType = eventType;
    }

    delete(eventType: IEventType): void {
        const modalRef = this.modalService.open( EventTypeDeleteDialogComponent, {
        size: 'lg',
        backdrop: 'static',
        });
        modalRef.componentInstance.eventType = eventType;
    }
}