import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ThemeOption } from './theme-option.model';
import { ThemeType } from './theme-type.model';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      mat-icon-button
      [matTooltip]="themeOptions[value].tooltip"
      (click)="toggleTheme()"
    >
      <mat-icon>{{ themeOptions[value].icon }}</mat-icon>
    </button>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  @Input() value: ThemeType = 'DARK';
  @Output() valueChange = new EventEmitter<ThemeType>();

  themeOptions: Record<ThemeType, ThemeOption> = {
    LIGHT: new ThemeOption('LIGHT', 'light_mode', 'Switch to dark mode'),
    DARK: new ThemeOption('DARK', 'dark_mode', 'Switch to light mode'),
  };

  toggleTheme(): void {
    this.value = this.value === 'LIGHT' ? 'DARK' : 'LIGHT';
    this.valueChange.emit(this.value);
  }
}
