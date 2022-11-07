import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { EventType, IEventType } from 'src/app/shared/models/event-type.model';
import { EventTypeService } from '../../event-type.service';

@Component({
  selector: 'event-type-update',
  templateUrl: './event-type-update.component.html',
})

export class EventTypeUpdateComponent implements OnInit {
  
  isSaving = false;
  eventType?: IEventType;

  editForm = this.fb.group({
    id: [''],
    description: [''],
    isActive: [false],
  });

  constructor(
    protected eventTypeService: EventTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm(): void {
    this.editForm.patchValue({
      id: this.eventType?.id,
      description: this.eventType?.description,
      isActive: this.eventType?.isActive,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eventType = this.createFromForm();
    if (eventType.id !== undefined) {
      this.subscribeToSaveResponse(this.eventTypeService.update(eventType));
    } else {
      this.subscribeToSaveResponse(this.eventTypeService.create(eventType));
    }
  }

  private createFromForm(): IEventType {
    return {
      ...new EventType(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
    };
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IEventType>>
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    EventBus.getInstance().dispatch<any>('userListModification');
    this.activeModal.close();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}