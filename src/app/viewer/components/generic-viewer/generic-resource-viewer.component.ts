import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { GenericProperty } from '@app/shared';
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { GenericViewer } from './generic-viewer.model';

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
export class GenericResourceViewerComponent extends GenericViewer {
  @HostBinding('style.border-width')
  get borderWidth(): string {
    return this.depth > 0 ? '1px' : '0px';
  }

  @Input() json: JsonLdObj | null | undefined;

  _trackByGenericProperty(index: number, item: GenericProperty): any {
    return item.iri;
  }
}
