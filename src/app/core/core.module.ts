import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { CovalentLayoutModule } from '@covalent/core/layout';

import { ResourceFormModule, ThemeToggleModule } from './components';
import { AppComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    CovalentLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    ResourceFormModule,
    RouterModule,
    ThemeToggleModule,
  ],
  declarations: [AppComponent],
})
export class CoreModule {}
