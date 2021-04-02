import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { GenericProperty } from '../../models';

@Component({
  selector: 'app-generic-property-viewer',
  templateUrl: 'generic-property-viewer.component.html',
  styles: [
    `
      :host {
        display: block;
        padding: 8px;
        border-radius: 8px;
        margin-top:8px;
        margin-bottom: 8px;
      }
      .property-name {
        margin: 0;
      }
      mat-list {
        padding-top: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericPropertyViewerComponent {
  @HostBinding('style.margin-left')
  get indentation(): string {
    return `${this.depth * 16}px`;
  }

  @Input() property: GenericProperty | null | undefined;
  @Input() depth = 0;
}
