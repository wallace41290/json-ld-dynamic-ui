import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentJsonFormatterModule } from '@covalent/core/json-formatter';
import { CovalentLayoutModule } from '@covalent/core/layout';

import { AppRoutingModule } from './app-routing.module';
import { ResourceFormModule } from './components';
import { AppComponent } from './containers';
import { ApiKeyInterceptor, CacheInterceptor } from './services';

const LocalModules = [ResourceFormModule];
const CovalentModules = [
  CovalentDialogsModule,
  CovalentLayoutModule,
  CovalentJsonFormatterModule,
];
const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTooltipModule,
];

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CovalentModules,
    HttpClientModule,
    LocalModules,
    MaterialModules,
  ],
  declarations: [AppComponent],
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
