import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { EventTypeComponent } from "./containers/event-type.component";
import { EventTypeUpdateComponent } from "./components/event-type-update/event-type-update.component";
import { EventTypeDeleteDialogComponent } from "./components/event-type-delete-dialog/event-type-delete-dialog.component";
import { eventTypeRoute } from "./event-type.route";

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(eventTypeRoute)
    ], 
    declarations: [ EventTypeComponent , EventTypeDeleteDialogComponent , EventTypeUpdateComponent ],
    entryComponents: []
})

export class EventTypeModule {}