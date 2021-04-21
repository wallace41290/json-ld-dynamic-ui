import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { JsonLdObj } from 'jsonld/jsonld-spec';

@Component({
  selector: 'app-generic-resource-viewer',
  templateUrl: 'generic-resource-viewer.component.html',
  styles: [
    `
      :host {
        display: block;
        position: relative;
        border-style: solid;
        border-radius: 8px;
        padding: 8px;
        margin-top: 8px;
      }
      .expand-button {
        position: absolute;
        top: 0;
        right: 0;
      }
      .hide {
        display: none;
      }
      mat-list {
        padding-top: 0px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericResourceViewerComponent {
  @HostBinding('style.border-width')
  get borderWidth(): string {
    return this.depth > 0 ? '1px' : '0px';
  }

  @HostBinding('style.margin-left')
  get indentation(): string {
    return `${this.depth * 16}px`;
  }

  /**
   * Property nested depth from the root resource.
   * i.e. depth of 0 indicates this is a direct child of the root resource.
   */
  @Input() depth = 0;

  @Input() json: JsonLdObj | null | undefined;

  /** Whether the contents are expanded */
  expanded = true;
}
