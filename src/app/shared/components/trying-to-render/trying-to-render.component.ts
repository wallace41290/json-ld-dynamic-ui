import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trying-to-render',
  template: `<h2 class="mat-display-3 text-color-effect">Trying very hard to render this...</h2>`,
  styles: [
    `
      h2.mat-display-3 {
        font-weight: 500;
        text-align: center;
        line-height: 1.5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryingToRenderComponent {}
