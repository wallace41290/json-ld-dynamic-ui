import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThemeToggleComponent } from './theme-toggle.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  declarations: [ThemeToggleComponent],
  exports: [ThemeToggleComponent],
})
export class ThemeToggleModule {}
