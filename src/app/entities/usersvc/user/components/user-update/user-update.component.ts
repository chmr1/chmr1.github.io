import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBus } from 'src/app/shared/services/event-bus.service';
import { User, IUser } from 'src/app/shared/models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
})

export class UserUpdateComponent implements OnInit {
  isSaving = false;
  user?: IUser;

  editForm = this.fb.group({
    id: [''],
    name: [''],
    email: [''],
    password: [''],
  });

  constructor(
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm(): void {
    this.editForm.patchValue({
      id: this.user?.id,
      name: this.user?.name,
      email: this.user?.email,
      password: this.user?.password,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user = this.createFromForm();
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
    }
  }

  private createFromForm(): IUser {
    return {
      ...new User(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
    };
  }

  //trackById(index: number, item: SelectableEntity): any {
  //return item;
  //}

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IUser>>
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
