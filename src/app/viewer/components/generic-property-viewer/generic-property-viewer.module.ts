import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FilterResourcePropertiesPipeModule, HasPropertyPipeModule, IsArrayPipeModule } from '@app/shared/pipes';

import { GenericPropertyViewerComponent } from './generic-property-viewer.component';
import { TempPropNamePipe } from './temp-prop-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FilterResourcePropertiesPipeModule,
    HasPropertyPipeModule,
    IsArrayPipeModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [GenericPropertyViewerComponent, TempPropNamePipe],
  exports: [GenericPropertyViewerComponent],
})
export class GenericPropertyViewerModule {}
