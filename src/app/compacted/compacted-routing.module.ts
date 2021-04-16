import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompactedComponent } from './compacted.component';

const routes: Routes = [{ path: '', component: CompactedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompactedRoutingModule { }
