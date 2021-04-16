import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '@app/shared/services';

@Component({
  selector: 'app-expanded',
  templateUrl: './expanded.component.html',
  styleUrls: ['./expanded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandedComponent {
  constructor(public store: StoreService) {}
}
