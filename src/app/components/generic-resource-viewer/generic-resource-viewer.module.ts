import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FilterResourcePropertiesPipeModule } from '../../pipes';
import { GenericPropertyViewerModule } from '../generic-property-viewer';
import { GenericResourceViewerComponent } from './generic-resource-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FilterResourcePropertiesPipeModule,
    GenericPropertyViewerModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [GenericResourceViewerComponent],
  exports: [GenericResourceViewerComponent],
})
export class GenericResourceViewerModule {}
