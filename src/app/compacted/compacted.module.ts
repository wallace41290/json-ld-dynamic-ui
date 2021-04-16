import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CovalentJsonFormatterModule } from '@covalent/core/json-formatter';

import { CompactedRoutingModule } from './compacted-routing.module';
import { CompactedComponent } from './compacted.component';

@NgModule({
  imports: [CommonModule, CompactedRoutingModule, CovalentJsonFormatterModule],
  declarations: [CompactedComponent],
})
export class CompactedModule {}
