import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TryingToRenderModule } from '@app/shared';
import { ExtractJsonLdObjectPipeModule } from '@app/shared/pipes';
import { CovalentJsonFormatterModule } from '@covalent/core/json-formatter';

import { ExpandedRoutingModule } from './expanded-routing.module';
import { ExpandedComponent } from './expanded.component';

@NgModule({
  imports: [CommonModule, CovalentJsonFormatterModule, ExpandedRoutingModule, ExtractJsonLdObjectPipeModule, TryingToRenderModule],
  declarations: [ExpandedComponent],
})
export class ExpandedModule {}
