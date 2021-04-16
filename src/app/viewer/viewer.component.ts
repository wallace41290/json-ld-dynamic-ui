import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '@app/shared/services';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerComponent {
  constructor(public store: StoreService) {}
}
