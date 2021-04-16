import { Component, OnInit } from '@angular/core';
import { StoreService } from '@app/shared';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  constructor(public store: StoreService) {}
}
