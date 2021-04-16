import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '@app/shared/services';

@Component({
  selector: 'app-compacted',
  templateUrl: './compacted.component.html',
  styleUrls: ['./compacted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactedComponent {
  constructor(public store: StoreService) {}
}
