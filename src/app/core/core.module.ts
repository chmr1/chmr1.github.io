import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './../shared/shared.module';
import { ConfigProvider } from './config.provider';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [],
  providers: [ConfigProvider],
  exports: [],
})
export class CoreModule {}
