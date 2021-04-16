import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtractJsonLdObjectPipeModule } from '@app/shared/pipes';

import { GenericResourceViewerModule } from './components';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';

@NgModule({
  imports: [CommonModule, ViewerRoutingModule, GenericResourceViewerModule, ExtractJsonLdObjectPipeModule],
  declarations: [ViewerComponent],
})
export class ViewerModule {}