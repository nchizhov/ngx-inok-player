import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgxInokPlayerComponent} from './ngx-inok-player.component';
import {AudioTimePipe} from './pipes/audio-time.pipe';
import {NgxInokPlayerService} from './ngx-inok-player.service';

@NgModule({
  declarations: [
    NgxInokPlayerComponent,

    AudioTimePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NgxInokPlayerComponent]
})
export class NgxInokPlayerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxInokPlayerModule,
      providers: [
        NgxInokPlayerService
      ]
    };
  }
}
