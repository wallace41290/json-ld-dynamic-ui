import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { TryingToRenderModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, EditorRoutingModule, TryingToRenderModule],
  declarations: [EditorComponent],
})
export class EditorModule {}
