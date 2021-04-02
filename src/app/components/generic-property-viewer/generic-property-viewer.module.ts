import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FilterResourcePropertiesPipeModule, IsArrayPipeModule } from '../../pipes';
import { GenericPropertyViewerComponent } from './generic-property-viewer.component';
import { TempPropNamePipe } from './temp-prop-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FilterResourcePropertiesPipeModule,
    IsArrayPipeModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [GenericPropertyViewerComponent, TempPropNamePipe],
  exports: [GenericPropertyViewerComponent],
})
export class GenericPropertyViewerModule {}
