import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TryingToRenderModule } from '@app/shared';
import { ExtractJsonLdObjectPipeModule } from '@app/shared/pipes';

import { GenericViewerModule } from './components';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';

@NgModule({
  imports: [CommonModule, ExtractJsonLdObjectPipeModule, GenericViewerModule, TryingToRenderModule, ViewerRoutingModule],
  declarations: [ViewerComponent],
})
export class ViewerModule {}
