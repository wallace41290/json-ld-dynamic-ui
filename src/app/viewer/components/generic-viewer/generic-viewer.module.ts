import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FilterResourcePropertiesPipeModule, HasPropertyPipeModule, IsArrayPipeModule } from '@app/shared/pipes';
import { CovalentJsonFormatterModule } from '@covalent/core/json-formatter';

import { FallbackPropName } from './fallback-prop-name.pipe';
import { GenericPropertyViewerComponent } from './generic-property-viewer.component';
import { GenericResourceViewerComponent } from './generic-resource-viewer.component';
import { ShowXMorePipe } from './show-x-more.pipe';

@NgModule({
  imports: [
    CommonModule,
    CovalentJsonFormatterModule,
    FilterResourcePropertiesPipeModule,
    FlexModule,
    HasPropertyPipeModule,
    IsArrayPipeModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [GenericPropertyViewerComponent, GenericResourceViewerComponent, FallbackPropName, ShowXMorePipe],
  exports: [GenericPropertyViewerComponent, GenericResourceViewerComponent],
})
export class GenericViewerModule {}
