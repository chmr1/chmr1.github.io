import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [SharedLibsModule, HttpClientModule],
  declarations: [],
  exports: [SharedLibsModule, HttpClientModule],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
