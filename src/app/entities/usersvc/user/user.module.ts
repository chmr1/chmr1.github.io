import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './containers/user.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteDialogComponent } from './components/user-delete-dialog/user-delete-dialog.component';
import { userRoute } from './user.route';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoute),
  ],
  declarations: [UserComponent, UserUpdateComponent, UserDeleteDialogComponent],
  entryComponents: [UserDeleteDialogComponent],
})
export class UserModule {}
