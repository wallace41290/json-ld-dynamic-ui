import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonLdObj } from 'jsonld/jsonld-spec';

@Component({
  selector: 'app-generic-resource-viewer',
  templateUrl: 'generic-resource-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericResourceViewerComponent {
  @Input() json: JsonLdObj | null | undefined;
}
