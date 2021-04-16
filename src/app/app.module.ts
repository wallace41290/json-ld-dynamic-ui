import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, CoreModule } from '@app/core';
import { ApiKeyInterceptor, CacheInterceptor } from '@app/shared/services';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, CoreModule, HttpClientModule, CovalentDialogsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
