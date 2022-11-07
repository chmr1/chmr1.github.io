import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { EventWork, IEventWork } from 'src/app/shared/models/event-work.model';
import { EventWorkService } from '../../event-work.service';
import { EventTypeService } from '../../../event-type/event-type.service';
import { IEventType } from 'src/app/shared/models/event-type.model';

type SelectableEntity = IEventWork | IEventType;

@Component({
  selector: 'event-work-update',
  templateUrl: './event-work-update.component.html',
})
export class EventWorkUpdateComponent implements OnInit {
  isSaving = false;
  eventWork?: IEventWork;
  eventWorkTypes: IEventType[] = [];

  editForm = this.fb.group({
    id: [''],
    type: [{}],
    title: [''],
    author: [''],
    content: [''],
    date: [new Date()],
    timeStart: [''],
    timeEnd: [''],
    status: [''],
  });

  constructor(
    protected eventWorkService: EventWorkService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    protected eventTypeService: EventTypeService
  ) {}

  ngOnInit(): void {
    this.updateForm();
    this.eventTypeService
      .query()
      .subscribe((res: HttpResponse<IEventWork[]>) => {
        this.eventWorkTypes = res.body || [];
      });
  }

  updateForm(): void {
    this.editForm.patchValue({
      id: this.eventWork?.id,
      type: this.eventWork?.type,
      title: this.eventWork?.title,
      author: this.eventWork?.author,
      content: this.eventWork?.content,
      date: this.eventWork?.date,
      timeStart: this.eventWork?.timeStart,
      timeEnd: this.eventWork?.timeEnd,
      status: this.eventWork?.status,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eventWork = this.createFromForm();
    if (eventWork.id !== undefined) {
      this.subscribeToSaveResponse(this.eventWorkService.update(eventWork));
    } else {
      this.subscribeToSaveResponse(this.eventWorkService.create(eventWork));
    }
  }

  private createFromForm(): IEventWork {
    return {
      ...new EventWork(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      title: this.editForm.get(['title'])!.value,
      author: this.editForm.get(['author'])!.value,
      content: this.editForm.get(['content'])!.value,
      date: this.editForm.get(['date'])!.value,
      timeStart: this.editForm.get(['timeStart'])!.value,
      timeEnd: this.editForm.get(['timeEnd'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IEventWork>>
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    EventBus.getInstance().dispatch<any>('eventWorkListModification');
    this.activeModal.close();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  compareEventType(t1: IEventType, t2: IEventType): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
